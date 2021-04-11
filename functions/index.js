'use strict';
global['functions'] = require('firebase-functions');
global['admin'] = require('firebase-admin');

const path = require('path');
const spawn = require('child-process-promise').spawn;
const os = require('os');
const mkdirp = require('mkdirp');
const fs = require('fs');
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

admin.initializeApp();

const db = admin.firestore()


exports.checkProductName = functions.firestore
    .document('products/{id}')
    // check if new products contain key word
    .onCreate((snap, context) => {
      const product = snap.data();
      let name = product.name
      if (name.includes('ugly') || name.includes('“messy”') || name.includes('“trash”') || name.includes('“body”')) {
        console.log(name + ' is forbidden. Deleting and adding to forbidden key words collection')
        snap.ref.delete()
        // db.collection('products').doc(snap.id).delete()
        db.collection('rules').doc('forbidden-key-words').update({words: admin.firestore.FieldValue.arrayUnion(name)})
      } else {
        console.log(name + ' is not forbidden')
      }
      return null;
    });


exports.checkPriceDiff = functions.firestore
  .document('products/{id}')
// check if price change is greater than 50%
  .onUpdate((snap, context) => {
  const newPrice = (snap.after.data().price);
  const oldPrice = (snap.before.data().price);
  let diff = (100 * Math.abs( ( parseFloat(newPrice) - parseFloat(oldPrice) ) / ( (parseFloat(newPrice)+parseFloat(oldPrice))/2 ) ))
  console.log('difference percentage: ',diff)
  if (diff>50) {
    console.log('difference is greater than 50%, will not change price')
  } else {
    console.log('difference is less than 50%, take oldprice and multiply by 50%')
    snap.after.ref.update({price:(0.5)*parseFloat(oldPrice)})
  }
  return null;
});

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType; // This is the image MIME type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return functions.logger.log('This is not an image.');
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    return functions.logger.log('Already a Thumbnail.');
  }

  // Cloud Storage files.
  const bucket = admin.storage().bucket(object.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const metadata = {
    contentType: contentType,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    // 'Cache-Control': 'public,max-age=3600',
  };
  
  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir)
  // Download file from bucket.
  await file.download({destination: tempLocalFile});
  functions.logger.log('The file has been downloaded to', tempLocalFile);
  // Generate a thumbnail using ImageMagick.
  await spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], {capture: ['stdout', 'stderr']});
  functions.logger.log('Thumbnail created at', tempLocalThumbFile);
  // Uploading the Thumbnail.
  await bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
  functions.logger.log('Thumbnail uploaded to Storage at', thumbFilePath);
  // Once the image has been uploaded delete the local files to free up disk space.
  fs.unlinkSync(tempLocalFile);
  fs.unlinkSync(tempLocalThumbFile);
  // Get the Signed URLs for the thumbnail and original image.
  const results = await Promise.all([
    thumbFile.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    }),
    file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    }),
  ]);
  functions.logger.log('Got Signed URLs.');
  const thumbResult = results[0];
  const originalResult = results[1];
  const thumbFileUrl = thumbResult[0];
  const fileUrl = originalResult[0];
  // Add the URLs to the Database
  await admin.database().ref('images/').push({path: fileUrl, thumbnail: thumbFileUrl});
  return functions.logger.log('Thumbnail URLs saved to database.');
});



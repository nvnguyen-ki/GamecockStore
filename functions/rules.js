

/**
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read, 
      write: if get(/databases/$(database)/documents/usertype/$(request.auth.uid)).data.userType == 'owner'
    }
    match /users/{userid}/{document=**} {
      allow read, 
      write: if request.auth.uid != ''
    }
    match /usertype/{userid}/{document=**} {
      allow read;
      allow write;
    }
    
    
  }
}
**/

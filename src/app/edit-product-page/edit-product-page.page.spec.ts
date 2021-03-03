import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProductPagePage } from './edit-product-page.page';

describe('EditProductPagePage', () => {
  let component: EditProductPagePage;
  let fixture: ComponentFixture<EditProductPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

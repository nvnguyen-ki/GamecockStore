import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductListPagePage } from './product-list-page.page';

describe('ProductListPagePage', () => {
  let component: ProductListPagePage;
  let fixture: ComponentFixture<ProductListPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

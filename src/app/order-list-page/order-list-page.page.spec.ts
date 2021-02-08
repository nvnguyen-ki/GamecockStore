import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderListPagePage } from './order-list-page.page';

describe('OrderListPagePage', () => {
  let component: OrderListPagePage;
  let fixture: ComponentFixture<OrderListPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

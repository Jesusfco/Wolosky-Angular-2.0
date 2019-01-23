import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParkingComponent } from './admin-parking.component';

describe('AdminParkingComponent', () => {
  let component: AdminParkingComponent;
  let fixture: ComponentFixture<AdminParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

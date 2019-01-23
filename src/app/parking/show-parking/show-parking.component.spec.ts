import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowParkingComponent } from './show-parking.component';

describe('ShowParkingComponent', () => {
  let component: ShowParkingComponent;
  let fixture: ComponentFixture<ShowParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

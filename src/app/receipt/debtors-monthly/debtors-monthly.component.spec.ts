import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsMonthlyComponent } from './debtors-monthly.component';

describe('DebtorsMonthlyComponent', () => {
  let component: DebtorsMonthlyComponent;
  let fixture: ComponentFixture<DebtorsMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorsMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

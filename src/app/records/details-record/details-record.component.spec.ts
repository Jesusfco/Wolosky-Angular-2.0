import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecordComponent } from './details-record.component';

describe('DetailsRecordComponent', () => {
  let component: DetailsRecordComponent;
  let fixture: ComponentFixture<DetailsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

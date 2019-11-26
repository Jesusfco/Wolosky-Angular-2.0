import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecordComponent } from './update-record.component';

describe('UpdateRecordComponent', () => {
  let component: UpdateRecordComponent;
  let fixture: ComponentFixture<UpdateRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
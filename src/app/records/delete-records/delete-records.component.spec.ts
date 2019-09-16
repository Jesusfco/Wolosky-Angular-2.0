import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordsComponent } from './delete-records.component';

describe('DeleteRecordsComponent', () => {
  let component: DeleteRecordsComponent;
  let fixture: ComponentFixture<DeleteRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

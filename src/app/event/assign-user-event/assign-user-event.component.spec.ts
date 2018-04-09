import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserEventComponent } from './assign-user-event.component';

describe('AssignUserEventComponent', () => {
  let component: AssignUserEventComponent;
  let fixture: ComponentFixture<AssignUserEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUserEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

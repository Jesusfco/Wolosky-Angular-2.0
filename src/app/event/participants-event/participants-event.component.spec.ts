import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsEventComponent } from './participants-event.component';

describe('ParticipantsEventComponent', () => {
  let component: ParticipantsEventComponent;
  let fixture: ComponentFixture<ParticipantsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

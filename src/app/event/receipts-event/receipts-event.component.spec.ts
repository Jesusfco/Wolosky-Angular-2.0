import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsEventComponent } from './receipts-event.component';

describe('ReceiptsEventComponent', () => {
  let component: ReceiptsEventComponent;
  let fixture: ComponentFixture<ReceiptsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

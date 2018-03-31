import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecieptComponent } from './create-reciept.component';

describe('CreateRecieptComponent', () => {
  let component: CreateRecieptComponent;
  let fixture: ComponentFixture<CreateRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

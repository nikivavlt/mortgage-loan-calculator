import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleApplicationPopUpComponent } from './single-application-pop-up.component';

describe('SingleApplicationPopUpComponent', () => {
  let component: SingleApplicationPopUpComponent;
  let fixture: ComponentFixture<SingleApplicationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleApplicationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleApplicationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

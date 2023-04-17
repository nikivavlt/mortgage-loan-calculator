import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInformationComponent } from './loan-information.component';

describe('LoanInformationComponent', () => {
  let component: LoanInformationComponent;
  let fixture: ComponentFixture<LoanInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

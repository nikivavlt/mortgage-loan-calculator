import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMaxMortgageAmountComponent } from './show-max-mortgage-amount.component';

describe('ShowMaxMortgageAmountComponent', () => {
  let component: ShowMaxMortgageAmountComponent;
  let fixture: ComponentFixture<ShowMaxMortgageAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMaxMortgageAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMaxMortgageAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

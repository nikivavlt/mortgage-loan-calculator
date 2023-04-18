import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndFinancialLiabilitiesComponent } from './income-and-financial-liabilities.component';

describe('IncomeAndFinancialLiabilitiesComponent', () => {
  let component: IncomeAndFinancialLiabilitiesComponent;
  let fixture: ComponentFixture<IncomeAndFinancialLiabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeAndFinancialLiabilitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAndFinancialLiabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

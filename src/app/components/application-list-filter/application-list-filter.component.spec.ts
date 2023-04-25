import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListFilterComponent } from './application-list-filter.component';

describe('ApplicationListFilterComponent', () => {
  let component: ApplicationListFilterComponent;
  let fixture: ComponentFixture<ApplicationListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

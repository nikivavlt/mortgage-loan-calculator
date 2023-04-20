import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfApplicationsComponent } from './list-of-applications.component';

describe('ListOfApplicationsComponent', () => {
  let component: ListOfApplicationsComponent;
  let fixture: ComponentFixture<ListOfApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommissionPromoterListComponent } from './report-commission-promoter-list.component';

describe('ReportCommissionPromoterListComponent', () => {
  let component: ReportCommissionPromoterListComponent;
  let fixture: ComponentFixture<ReportCommissionPromoterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCommissionPromoterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommissionPromoterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

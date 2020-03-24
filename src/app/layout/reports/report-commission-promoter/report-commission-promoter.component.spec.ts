import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommissionPromoterComponent } from './report-commission-promoter.component';

describe('ReportCommissionPromoterComponent', () => {
  let component: ReportCommissionPromoterComponent;
  let fixture: ComponentFixture<ReportCommissionPromoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCommissionPromoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommissionPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

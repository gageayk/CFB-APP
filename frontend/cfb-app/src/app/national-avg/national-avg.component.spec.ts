import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAvgComponent } from './national-avg.component';

describe('NationalAvgComponent', () => {
  let component: NationalAvgComponent;
  let fixture: ComponentFixture<NationalAvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalAvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalAvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

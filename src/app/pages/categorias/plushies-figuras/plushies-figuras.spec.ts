import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlushiesFiguras } from './plushies-figuras';

describe('PlushiesFiguras', () => {
  let component: PlushiesFiguras;
  let fixture: ComponentFixture<PlushiesFiguras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlushiesFiguras],
    }).compileComponents();

    fixture = TestBed.createComponent(PlushiesFiguras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

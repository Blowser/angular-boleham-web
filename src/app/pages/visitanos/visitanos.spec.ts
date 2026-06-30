import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visitanos } from './visitanos';

describe('Visitanos', () => {
  let component: Visitanos;
  let fixture: ComponentFixture<Visitanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Visitanos],
    }).compileComponents();

    fixture = TestBed.createComponent(Visitanos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

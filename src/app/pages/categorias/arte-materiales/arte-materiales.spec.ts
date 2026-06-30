import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArteMateriales } from './arte-materiales';

describe('ArteMateriales', () => {
  let component: ArteMateriales;
  let fixture: ComponentFixture<ArteMateriales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArteMateriales],
    }).compileComponents();

    fixture = TestBed.createComponent(ArteMateriales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

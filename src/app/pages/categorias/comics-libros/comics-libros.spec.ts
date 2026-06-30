import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsLibros } from './comics-libros';

describe('ComicsLibros', () => {
  let component: ComicsLibros;
  let fixture: ComponentFixture<ComicsLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicsLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPractica } from './crear-practica';

describe('CrearPractica', () => {
  let component: CrearPractica;
  let fixture: ComponentFixture<CrearPractica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPractica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPractica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

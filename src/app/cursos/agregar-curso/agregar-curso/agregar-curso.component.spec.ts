import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCursoComponent } from './agregar-curso.component';

describe('AgregarCursoComponent', () => {
  let component: AgregarCursoComponent;
  let fixture: ComponentFixture<AgregarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCursoComponent]
    });
    fixture = TestBed.createComponent(AgregarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

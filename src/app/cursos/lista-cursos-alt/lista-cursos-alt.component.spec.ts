import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCursosAltComponent } from './lista-cursos-alt.component';

describe('ListaCursosAltComponent', () => {
  let component: ListaCursosAltComponent;
  let fixture: ComponentFixture<ListaCursosAltComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCursosAltComponent]
    });
    fixture = TestBed.createComponent(ListaCursosAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

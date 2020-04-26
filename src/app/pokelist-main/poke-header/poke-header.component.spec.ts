import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeHeaderComponent } from './poke-header.component';

describe('PokeHeaderComponent', () => {
  let component: PokeHeaderComponent;
  let fixture: ComponentFixture<PokeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokelistMainComponent } from './pokelist-main.component';

describe('PokelistMainComponent', () => {
  let component: PokelistMainComponent;
  let fixture: ComponentFixture<PokelistMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokelistMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelistMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

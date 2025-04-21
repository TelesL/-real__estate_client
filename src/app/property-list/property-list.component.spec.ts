import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertyListComponent } from './property-list.component';
import { PropertyService } from '../services/property.service';
import { of } from 'rxjs';

describe('PropertyListComponent', () => {
  let component: PropertyListComponent;
  let fixture: ComponentFixture<PropertyListComponent>;
  let propertyService: PropertyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyListComponent],
      imports: [HttpClientTestingModule],
      providers: [PropertyService],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyListComponent);
    component = fixture.componentInstance;
    propertyService = TestBed.inject(PropertyService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de imóveis ao iniciar', () => {
    const mockProperties = [
      { id: '1', title: 'Teste', address: 'Rua X', price: 3000, description: 'Casa bonita', image_url: '' },
    ];

    spyOn(propertyService, 'getAllProperties').and.returnValue(of(mockProperties));
    component.ngOnInit();
    expect(component.properties.length).toBe(1);
    expect(component.properties[0].title).toBe('Teste');
  });
});

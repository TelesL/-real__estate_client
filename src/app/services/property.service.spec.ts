import { TestBed }                                                      from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }               from '@angular/common/http/testing';
import { PropertyService }                                              from './property.service';
import { Property }                                                     from '../models/property.model';

describe('PropertyService', () => {
  let service: PropertyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PropertyService],
    });

    service = TestBed.inject(PropertyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve buscar todos os imóveis', () => {
    const mockProperties: Property[] = [
      { id: '1', title: 'Imóvel A', address: 'Rua A', price: 1000, description: 'Desc A', image_url: '' },
      { id: '2', title: 'Imóvel B', address: 'Rua B', price: 2000, description: 'Desc B', image_url: '' },
    ];

    service.getAllProperties().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(mockProperties);
    });

    const req = httpMock.expectOne('http://localhost:8000/properties');
    expect(req.request.method).toBe('GET');
    req.flush(mockProperties);
  });
});

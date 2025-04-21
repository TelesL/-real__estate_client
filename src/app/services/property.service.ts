import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8000/properties'; // Esse é o endpoint correto da API

  constructor(private http: HttpClient) {}

  // GET todos os imóveis
  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  // GET um imóvel específico por ID
  getPropertyById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  // POST para criar um novo imóvel
  createProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  // PUT para atualizar um imóvel existente
  updateProperty(id: string, property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
  }

  // DELETE para excluir um imóvel
  deleteProperty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET para buscar imóveis
  searchProperties(query: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/search`, {
      params: { query },
    });
  }
}

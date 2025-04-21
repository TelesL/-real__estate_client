import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyEditorComponent } from '../property-editor/property-editor.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PropertyEditorComponent],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  searchQuery: string = '';
  selectedProperty: Property | null = null;
  modalOpen: boolean = false;
  noResults = false;
  isLoading = false;

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading = true;
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.isLoading = false;
        this.noResults = false;
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis:', err);
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.loadProperties();
      return;
    }

    this.isLoading = true;
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties = data.filter((p) =>
          p.title.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query)
        );
        this.noResults = this.properties.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar imóveis:', err);
        this.isLoading = false;
      },
    });
  }

  openModal(property: Property | null = null): void {
    this.selectedProperty = property;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  saveProperty(property: Property): void {
    if (this.selectedProperty && this.selectedProperty.id) {
      this.propertyService.updateProperty(this.selectedProperty.id, property).subscribe({
        next: () => {
          this.loadProperties();
          this.closeModal();
        },
        error: (err) => console.error('Erro ao atualizar imóvel:', err),
      });
    } else {
      this.propertyService.createProperty(property).subscribe({
        next: () => {
          this.loadProperties();
          this.closeModal();
        },
        error: (err) => console.error('Erro ao criar imóvel:', err),
      });
    }
  }

  onDelete(id: string): void {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => this.loadProperties(),
        error: (err) => console.error('Erro ao excluir imóvel:', err),
      });
    }
  }
}

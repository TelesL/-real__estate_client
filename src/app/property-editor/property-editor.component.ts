import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Property } from '../models/property.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.css'],
})
export class PropertyEditorComponent implements OnChanges {
  @Input() property: Property | null = null;
  @Output() save = new EventEmitter<Property>();
  @Output() cancel = new EventEmitter<void>();

  formData: Property = {
    title: '',
    description: '',
    price: 0,
    address: '',
    image_url: ''
  };

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property']) {
      this.formData = this.property
        ? { ...this.property }
        : { title: '', description: '', price: 0, address: '', image_url: '' };
    }
  }

  get isEditMode(): boolean {
    return !!this.property?.id;
  }

  onSubmit(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.cancel.emit();
    this.router.navigate(['/']);
  }
}

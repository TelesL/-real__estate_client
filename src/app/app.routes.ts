import { Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyEditorComponent } from './property-editor/property-editor.component';

export const routes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'property-editor', component: PropertyEditorComponent },
  { path: 'property-editor/:id', component: PropertyEditorComponent },
];

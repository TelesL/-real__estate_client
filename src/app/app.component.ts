import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // RouterOutlet é o necessário aqui

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // Apenas RouterOutlet aqui
  template: `
    <main>
      <header class="brand-name">
      <img class="brand-logo" src="/assets/teles-imoveis.svg" alt="Teles-Imoveis" />
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}

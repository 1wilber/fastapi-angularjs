
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface ApiResponse {
  mensaje: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

@Injectable({ providedIn: 'root' })
export class App {
  protected title = 'web-client';
  readonly message = signal("Cargando...");

  constructor(private http: HttpClient) {
    this.fetchMessage(); // Fetch inicial
  }

  fetchMessage() {
    this.message.set("Cargando...");
    this.http.get<ApiResponse>('/api/saludo').subscribe(
      data => this.message.set(data.mensaje),
      _error => this.message.set("Error con el servidor.")
    );
  }
}

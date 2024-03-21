import { Component } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BryanDemoApi';

  constructor(private api: AppService) {}
  nomTabla = '';
  data: any[] = [];

  ngOnInit(): void {}

  solicitarData() {}
  llenarData(event: Event) {
    this.nomTabla = (event.target as HTMLSelectElement).value;
    this.api.getAll(this.nomTabla).subscribe((d) => {
      this.data = d;
      console.log(this.data);
    });
  }
}

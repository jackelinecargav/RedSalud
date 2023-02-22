import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  data: any;
  flagResponse: boolean = true;
  contratante: any;
  plan: any;
  campa1: any;
  campa2: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.peticionExterna();
  }
  
  peticionExterna(): void {
    try {
    this.http.get('http://backasistenciasdev.us-east-2.elasticbeanstalk.com/api/red-salud/test')
      .subscribe(response => {
        this.data = response;
        this.flagResponse = false;
        if (this.data.data != null || this.data.data != undefined) {
          this.contratante = this.data.data[0].contratante;
          this.plan = this.data.data[0].plan;
          this.campa1 = this.data.data[0].coberturas[0];
          this.campa2 = this.data.data[0].coberturas[1];
        }
      });
    } catch (err) {
      console.log('err:', err);
      this.data.data === null;
    };
  }
}

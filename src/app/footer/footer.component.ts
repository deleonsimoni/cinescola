import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  views;

  constructor(
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.viewsUp();
  }

  viewsUp(){
    this.http.get('/api/user/viewsUp').subscribe((data: any) => {
      this.views = data.counter;
    }, error => {
     console.log('error views up');
    });
  }

}

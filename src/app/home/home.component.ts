import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('template', { static: false }) templateRef: TemplateRef<any>;
  loadNews = false;
  news = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private toastr: ToastrService,
              private modalService: BsModalService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      }
    });

  }

  ngOnInit() {

    this.http.get("api/points/news").subscribe((res: any) => {

      this.loadNews = true;
      this.news = res;

    }, err => {
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });

  }

  irParaConteudo(id, category){

    this.router.navigate(['mapas', {id: id, category: category}]);


  }

}

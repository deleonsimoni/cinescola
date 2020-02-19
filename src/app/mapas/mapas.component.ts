import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EmbedVideoService } from 'ngx-embed-video';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {

  modalRef: BsModalRef;
  carregando = false;
  isCategoriaAberta = false;
  geocoder: any;
  galleries: any;
  gallerieSelect: any;
  categoria = "0";
  user: any;
  @ViewChild('categoriaSeta', { static: false }) categoriaSeta: ElementRef;


  public categorias = [
    { id: 1, name: 'Abecedários', icon: 'abecedario.png' },
    { id: 2, name: 'Entrevistas' },
    { id: 3, name: 'podcasts' },
    { id: 4, name: 'Produção Acadêmica' },
    { id: 5, name: 'Políticas' },
    { id: 6, name: 'Escolas' }
  ];

  location: Location = {
    lat: 10.2989969,
    lng: -78.2803034,
    zoom: 4
  };

  constructor(public mapsApiLoader: MapsAPILoader,
    private modalService: BsModalService,
    private authService: AuthService,
    private http: HttpClient,
    private embedService: EmbedVideoService,
  ) { }

  ngOnInit() {
    this.carregando = true;
    this.http.get(`api/user/getGallerys`).subscribe((res: any) => {
      this.galleries = res;
      this.carregando = false;
    }, err => {
      this.carregando = false;
    });
  }

  exibirCategorias() {
    if (this.isCategoriaAberta) {
      this.categoriaSeta.nativeElement.className = 'fa fa-chevron-down pull-right';
      this.isCategoriaAberta = false;
    } else {
      this.categoriaSeta.nativeElement.className = 'fa fa-chevron-up pull-right';
      this.isCategoriaAberta = true;
    }
  }

  getIcon(categoria) {
    return "../../assets/icones/abcdario3.png"
  }

  openModal(template: TemplateRef<any>, pos: any) {
    this.gallerieSelect = pos;
    this.modalRef = this.modalService.show(template);
  }

  mudarCategoria() {
    this.carregando = true;
    this.http.get(`api/user/getGallerys?categoria=${this.categoria}`).subscribe((res: any) => {
      this.galleries = res;
      this.carregando = false;
    }, err => {
      this.carregando = false;
    });
  }

  download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error('Erro ao relizar download.', 'Erro: ');
      vm.carregando = false;
    }
    this.carregando = true;
  }

  getNomeCategoria(categoria) {
    return this.categorias.filter(element => element.id + "" === categoria)[0].name;
  }

  styles = [

  ]
}
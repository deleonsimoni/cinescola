import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { EmbedVideoService } from 'ngx-embed-video';


declare var google: any;


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild('template', { static: false }) templateRef: TemplateRef<any>;

  geocoder: any;
  modalRef: BsModalRef;


  public submissionForm: FormGroup;
  public carregando = false;
  public carregandoMapa = false;
  public address = '';

  public galeria: any = {};
  categoria = 0;
  galleries: any;
  id: any = null;
  user: any;

  public locationMap = {
    lat: 19.2286289,
    lng: -97.4840638,
    zoom: 5
  };

  public categorias = [
    { id: 1, name: 'Abcdários', icon: 'abecedario.png' },
    { id: 2, name: 'Entrevistas' },
    { id: 3, name: 'podcasts' },
    { id: 4, name: 'Produção Acadêmica' },
    { id: 5, name: 'Políticas' },
    { id: 6, name: 'Escolas' }
  ];

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private http: HttpClient,
    private authService: AuthService,
    private embedService: EmbedVideoService,


  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.createForm();
  }

  private createForm(): void {
    this.submissionForm = this.builder.group({
      categoria: [null],
      nomeInstituicao: [null],
      galeria: [[]],
      lat: [null],
      lng: [null]
    });
  }

  placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;

    this.submissionForm.patchValue({
      nomeInstituicao: "",
      galeria: [],
      lat: lat,
      lng: lng
    });
    this.id = null;
  }

  selectMarker(position: any) {
    this.submissionForm.patchValue({
      categoria: position.categoria,
      nomeInstituicao: position.nomeInstituicao,
      galeria: position.galeria,
      lat: position.lat,
      lng: position.lng
    });
    this.id = position._id;
  }

  public upload() {
    if (!this.submissionForm.value.categoria) {
      this.toastr.error('Selecione uma categoria.', 'Atenção');
      return;
    } if (!this.submissionForm.value.nomeInstituicao) {
      this.toastr.error('Escreva o nome da Instituição.', 'Atenção');
      return;
    } if (!this.submissionForm.value.lng) {
      this.toastr.error('Marque uma posição no mapa.', 'Atenção');
      return;
    } else {
      this.carregando = true;

      const formData: FormData = new FormData();

      formData.append('formulario', JSON.stringify(this.submissionForm.value));

      this.http.post(`api/user/upload/`, formData).subscribe((res: any) => {
        this.carregando = false;

        if (res && res.temErro) {
          this.toastr.error(res.mensagem, 'Erro: ');
        } else {
          this.toastr.success('Arquivo enviado com sucesso', 'Sucesso');
          this.mudarCategoria();

          this.submissionForm.patchValue({
            nomeInstituicao: "",
            galeria: [],
            lat: null,
            lng: null
          });
        }
      }, err => {
        this.carregando = false;
        this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
      });
    }
  }

  findLocation() {

    if (!this.address) {

      this.toastr.error('Digite o local que deseja buscar.', 'Atenção: ');

    } else {

      this.carregandoMapa = true;
      if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
      this.geocoder.geocode({
        'address': this.address
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          for (var i = 0; i < results[0].address_components.length; i++) {
            let types = results[0].address_components[i].types;
          }

          this.carregandoMapa = false;
          if (results[0].geometry.location) {
            this.submissionForm.get('lat').setValue(results[0].geometry.location.lat());
            this.submissionForm.get('lng').setValue(results[0].geometry.location.lng());
            this.locationMap.lat = results[0].geometry.location.lat();
            this.locationMap.lng = results[0].geometry.location.lng();
            this.locationMap.zoom = 10;
          }
        } else {
          this.carregandoMapa = false;
          this.toastr.error('endereço não localizado no Google Maps.', 'Atenção: ');

        }
      });

    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    return false;
  }

  addGaleria() {
    if (!this.galeria.titulo) {
      this.toastr.error('Escreva o nome do abecedário', 'Atenção');
      return;
    }

    if (this.id) {
      const formData: FormData = new FormData();

      let aux = {
        galeria: this.galeria,
        id: this.id
      }

      if (this.galeria.id) {
        this.reciverDelete(this.galeria.id);
      }

      formData.append('galeria', JSON.stringify(aux));

      this.http.post(`api/user/upload-galeria/`, formData).subscribe((res: any) => {
        this.carregando = false;

        if (res && res.temErro) {
          this.toastr.error(res.mensagem, 'Erro: ');
        } else {
          this.modalRef.hide();
          if (this.galeria.id > 1) {
            this.toastr.success('Arquivo alterado com sucesso', 'Sucesso');
            this.modalRef.hide();
          } else {
            this.toastr.success('Depoimento registrado com sucesso', 'Sucesso');
          }
          this.galeria = {};


          this.pesquisaPorCategoria();
        }
      }, err => {

        this.carregando = false;
        this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
      });
    } else {
      this.modalRef.hide();
      this.submissionForm.patchValue({
        galeria: []
      });
      this.submissionForm.get('galeria').value.push(this.galeria);
      this.galeria = {};
    }
  }

  removerID(id, arr) {
    return arr.filter(function (obj) {
      return obj._id != id;
    });
  }

  reciverDelete(depoimentoId) {
    if (!this.id) {
      this.submissionForm.get('galeria').value.push(this.removerID(depoimentoId, this.submissionForm.get('galeria').value));
    } else {
      this.http.delete("api/user/deleteDepoimento/" + depoimentoId).subscribe((res: any) => {
        if (res && res.temErro) {
          this.toastr.error(res.mensagem, 'Erro: ');
        } else {
          this.pesquisaPorCategoria();
          if (this.galeria.id > 1) {
            this.toastr.success('Arquivo removido com sucesso', 'Sucesso');
          }
        }
      }, err => {
        this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ' + err);
      });
      console.log('Delecao', depoimentoId);
    }
  }

  reciverAlter(depoimento) {
    this.galeria = depoimento;

    this.modalRef = this.modalService.show(this.templateRef);
  }

  mudarCategoria() {
    this.pesquisaPorCategoria();

    this.id = null;

    this.submissionForm.patchValue({
      nomeInstituicao: "",
      galeria: this.galeria,
      lat: null,
      lng: null
    });
  }

  pesquisaPorCategoria() {
    this.http.get("api/user/getGallerys?categoria=" + this.submissionForm.get('categoria').value).subscribe((res: any) => {
      this.galleries = res;
      if (this.id) {
        this.populaListaDepoimento();
      }
    }, err => {
    });
  }

  populaListaDepoimento() {
    console.log(this.galleries.find(element => element._id == this.id).galeria);
    this.submissionForm.get('galeria').setValue(
      this.galleries.find(element => element._id == this.id
      ).galeria);

    this.galleries.forEach(element => {
      if (element.url) {
        element.ytEmbed = this.embedService.embed(element.url, {
          attr: { width: 400, height: 315, frameborder: 0 }
        });
      }
    });

  }
}
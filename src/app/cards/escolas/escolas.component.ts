import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-escolas',
  templateUrl: './escolas.component.html',
  styleUrls: ['./escolas.component.scss']
})
export class EscolasComponent implements OnInit {

  @Input() contents: any;
  @Input() isAdmin: boolean;
  @Output() remover = new EventEmitter();
  @Output() alterar = new EventEmitter();

  user;
  
  constructor(
    private _sanitizer: DomSanitizer,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

  }

  delete(idEscola) {
    this.remover.emit(idEscola);
  }
  update(escola) {
    this.alterar.emit(escola);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

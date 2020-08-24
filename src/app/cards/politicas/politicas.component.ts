import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss']
})
export class PoliticasComponent implements OnInit {

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

  delete(ipPolitica) {
    this.remover.emit(ipPolitica);
  }
  update(politica) {
    this.alterar.emit(politica);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

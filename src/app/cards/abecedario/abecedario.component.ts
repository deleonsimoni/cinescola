import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { AuthService } from '../../auth/auth.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-abecedario',
  templateUrl: './abecedario.component.html',
  styleUrls: ['./abecedario.component.scss']
})
export class AbecedarioComponent implements OnInit {

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

  delete(idabecedario) {
    this.remover.emit(idabecedario);
  }
  update(abecedario) {
    this.alterar.emit(abecedario);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

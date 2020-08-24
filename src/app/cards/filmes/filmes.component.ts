import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

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

  delete(idFilme) {
    this.remover.emit(idFilme);
  }
  update(filme) {
    this.alterar.emit(filme);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}


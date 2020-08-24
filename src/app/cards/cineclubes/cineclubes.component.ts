import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-cineclubes',
  templateUrl: './cineclubes.component.html',
  styleUrls: ['./cineclubes.component.scss']
})
export class CineclubesComponent implements OnInit {

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

  delete(idCineclub) {
    this.remover.emit(idCineclub);
  }
  update(cineclub) {
    this.alterar.emit(cineclub);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

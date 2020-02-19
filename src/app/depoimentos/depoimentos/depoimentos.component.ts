import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss']
})
export class DepoimentosComponent implements OnInit {

  @Input() depoimentos: any;
  @Input() isAdmin: boolean;
  @Output() depoimentoRemovido = new EventEmitter();
  @Output() depoimentoAlterado = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
    private embedService: EmbedVideoService,
  ) { }

  ngOnInit() {

    this.depoimentos.forEach(element => {
      if (element.url) {
        element.ytEmbed = this.embedService.embed(element.url, {
          attr: { width: 400, height: 315, frameborder: 0 }
        });
      }
    });

  }


  deleteDepoimento(idDepoimento) {
    this.depoimentoRemovido.emit(idDepoimento);
  }
  alterDepoimento(depoimento) {
    this.depoimentoAlterado.emit(depoimento);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
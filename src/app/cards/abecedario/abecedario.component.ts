import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-abecedario',
  templateUrl: './abecedario.component.html',
  styleUrls: ['./abecedario.component.scss']
})
export class AbecedarioComponent implements OnInit {

  @Input() contents: any;
  @Input() isAdmin: boolean;
  @Input() isCoordinator: boolean;
  @Output() remover = new EventEmitter();
  @Output() alterar = new EventEmitter();
  @Output() aceitar = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

  }

  delete(idabecedario) {
    this.remover.emit(idabecedario);
  }
  update(abecedario) {
    this.alterar.emit(abecedario);
  }
  accept(item, aceito){
    if(aceito == '1'){
      item.icAprovado = true;
    } else {
      item.icAprovado = false;
    }
    this.aceitar.emit(item);

  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

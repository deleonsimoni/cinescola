import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animated-like',
  templateUrl: './animated-like.component.html',
  styleUrls: ['./animated-like.component.scss']
})
export class AnimatedLikeComponent implements OnInit {

  isLiked = false;
  notLogin = false;
  counter;
  @Input('likes') likes: any;
  @Input('user') user: any;
  @Input('content') content: any;
  @Input('category') category: any;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.user){
      this.isLiked = this.likes.includes(this.user._id);
    }
    this.counter = this.likes.length;
  }

  irParaLogin(){
    
    this.router.navigate(['/auth/login']);
  };

  changeLike(){

    if(this.user){
      this.notLogin = false;
      if (!this.isLiked) {

        this.http.post(`/api/likes/like/${this.category}/${this.content._id}/`, {}).subscribe((data: any) => {
          this.likes.push(this.user._id);
          this.counter = this.likes.length;
        }, error => {
          console.log('error views up');
        });

      } else {

        this.http.post(`/api/likes/unlike/${this.category}/${this.content._id}/`, {}).subscribe((data: any) => {
          const index: number = this.likes.indexOf(this.user._id);
          if (index !== -1) {
              this.likes.splice(index, 1);
              this.counter = this.likes.length;
          }
        }, error => {
          console.log('error views up');
        });

      }

      this.isLiked = !this.isLiked;
      
    } else {
      //usuario deslogado
      this.notLogin = true;
      /*const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Puxa, você ainda não realizou login na plataforma, para poder interagir você deverá efetuar o login. É rapidinho.',
          buttonText: {
            ok: 'Realizar Login',
            cancel: 'Cancelar'
          }
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          //mudar de tela
        }
      });*/

    }


  }

}

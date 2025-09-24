import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {


  private auth = inject(AuthService);


  usuario = signal<string>('');


  ngOnInit() {
    const user = this.auth.getUser();
    if(user) {
      this.usuario.set(user.nome);
    }
  }


  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      this.auth.signOut(); //apagar os dados da sessão
      location.href = '/'; //raiz do projeto
    }
  }


}





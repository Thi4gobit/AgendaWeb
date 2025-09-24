import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {


  //mensagens
  mensagemErro = signal<string>('');


  //injeções de dependência
  private http = inject(HttpClient);
  private auth = inject(AuthService);


  //Estrutura do formulário
  formAutenticacao = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  //Função para autenticar o usuário
  onSubmit() {
    this.http.post(environment.apiUsuarios + '/autenticar', this.formAutenticacao.value)
      .subscribe({
        next: (data: any) => {
          this.auth.signIn(data); //salvar os dados do usuário autenticado
          //redirecionar para a página de dashboard
          location.href = '/pages/dashboard';
        },
        error: (e) => {
            this.mensagemErro.set(e.error.message);
         }
      });
  }


}





import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';


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


  //Estrutura do formulário
  formAutenticacao = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  //Função para autenticar o usuário
  onSubmit() {
    this.http.post(environment.apiUsuarios + '/autenticar', this.formAutenticacao.value)
      .subscribe({
        next: (data) => { console.log(data); }, //salvar os dados no navegador
        error: (e) => {
            this.mensagemErro.set(e.error.message);
         }
      });
  }


}






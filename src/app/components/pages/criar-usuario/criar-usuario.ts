import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule, //diretivas comuns do Angular
    FormsModule, //formulários reativos
    ReactiveFormsModule //formulários reativos
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {


  //atributos para exibir mensagens
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');


  //injeção de dependência do HttpClient
  private http = inject(HttpClient);


  //objeto para armazenar os dados do formulário
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",.<>\/?\\|`~])[A-Za-z\d!@#$%^&*()\-_=+\[\]{};:'",.<>\/?\\|`~]{8,}$/)]),
    senhaConfirmacao : new FormControl('', [Validators.required])
  });


  //função para capturar o evento de submissão do formulário
  onSubmit() {


    //limpar as mensagens
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');


    //verificar se as senhas não estão iguais
    if (this.formCadastro.value.senha !== this.formCadastro.value.senhaConfirmacao) {
      this.mensagemErro.set('As senhas não coincidem. Por favor, verifique e tente novamente.');
      return; //interromper a execução da função
    }


    //fazendo a requisição para a API
    this.http.post(environment.apiUsuarios + '/criar', this.formCadastro.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso.set(`Parabéns ${data.nome}, seu cadastro foi realizado com sucesso!`);
          this.formCadastro.reset(); //limpar o formulário
        },
        error: (e) => {
          this.mensagemErro.set(e.error.message);
        }
      });
  }
}






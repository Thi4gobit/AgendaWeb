import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { min } from 'rxjs';
import { Navbar } from '../../shared/navbar/navbar';


@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule, //funções comuns do Angular
    FormsModule, //para formulários reativos
    ReactiveFormsModule, //para formulários reativos
    Navbar
  ],
  templateUrl: './cadastro-tarefas.html',
  styleUrl: './cadastro-tarefas.css'
})
export class CadastroTarefas {


  //Atributos do componente
  //Primeiro estado: um array vazio
  //Signal: uma forma reativa de armazenar dados
  categorias = signal<any[]>([]); //Lista de objetos com valor inicial vazio


  //Mensagens de sucesso e erro
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');


  //Injeção de dependências
  private http = inject(HttpClient);


  //Criando o formulário de cadastro de tarefas
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    data : new FormControl('', [Validators.required]),
    hora : new FormControl('', [Validators.required]),
    prioridade : new FormControl('', [Validators.required]),
    categoriaId : new FormControl('', [Validators.required]),
  });


  //Função executada quando o componente é inicializado
  ngOnInit() {
    //Fazendo uma requisição GET para consultar as categorias
    this.http.get(environment.apiCategorias)
      .subscribe((response) => {
        //Atribuindo a resposta à variável categorias
        //Segundo estado: a resposta da API (array com categorias)
        this.categorias.set(response as any[]);
      })
  }


  //Função para capturar o evento de submit do formulário
  onSubmit() {
   
    //limpar as mensagens
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');


    //Enviar a requisição para a API
    this.http.post(environment.apiTarefas, this.formCadastro.value)
      .subscribe({ //aguardar a resposta da API
        next: () => { //em caso de sucesso
          this.mensagemSucesso.set('Tarefa cadastrada com sucesso!');
          this.formCadastro.reset(); //limpar o formulário
        },
        error: () => { //em caso de erro
          this.mensagemErro.set('Erro ao cadastrar a tarefa. Tente novamente mais tarde.');
        }
      });
  }
}





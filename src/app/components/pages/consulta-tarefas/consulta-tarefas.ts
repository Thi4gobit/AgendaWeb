import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule, //Diretivas comuns do Angular
    FormsModule,  //Diretivas de formulários do Angular
    ReactiveFormsModule //Diretivas de formulários reativos do Angular
  ],
  templateUrl: './consulta-tarefas.html',
  styleUrl: './consulta-tarefas.css'
})
export class ConsultaTarefas {


  //Atributos
  tarefas = signal<any[]>([]);


  //Mensagens de sucesso e erro
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');


  //Injeção de dependência do HttpClient
  private http = inject(HttpClient);


  //Criando um formulário reativo
  formConsulta = new FormGroup({ //formulário
    dataHoraInicio : new FormControl('', [Validators.required]),
    dataHoraFim : new FormControl('', [Validators.required]),
  });


  //Função para capturar o submit do formulário
  onSubmit() {
   
    //capturando os dados do formulário
    const dataHoraInicio = this.formConsulta.value.dataHoraInicio;
    const dataHoraFim = this.formConsulta.value.dataHoraFim;


    //enviando uma requisição HTTP para o backend
    this.http.get(`${environment.apiTarefas}/${dataHoraInicio}/${dataHoraFim}`)
      .subscribe(response => { //aguardando a resposta do backend
          this.tarefas.set(response as any[]); //armazenando a resposta
      });
  }


  //Função para excluir uma tarefa
  onDelete(id: string) {
    if(confirm('Deseja realmente excluir esta tarefa?')) {


      this.mensagemSucesso.set(''); //limpando mensagem de sucesso
      this.mensagemErro.set(''); //limpando mensagem de erro


      //enviando uma requisição HTTP para o backend
      this.http.delete(`${environment.apiTarefas}/${id}`)
        .subscribe({
          next: () => {
            this.mensagemSucesso.set('Tarefa excluída com sucesso!'); //mensagem de sucesso
            this.onSubmit(); //atualizando a lista de tarefas
          },
          error: () => {
            this.mensagemErro.set('Erro ao excluir tarefa.'); //mensagem de erro
          }
        });
    }
  }
}





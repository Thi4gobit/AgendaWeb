import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-tarefas.html',
  styleUrl: './cadastro-tarefas.css'
})

export class CadastroTarefas {

  // atributos do componente
  // primeiro estado: um array vazio
  // signal: uma forma reativa de armaznar dados
  categorias = signal<any[]>([]) // lista de objetos com valor inicial vazio

  // Injeção de dependências
  private http = inject(HttpClient);

  // Função executada quando o componente é inicializado
  ngOnInit() {
    this.http.get(environment.apiCategorias)
      .subscribe((response) => {
        //segundo estado: a resposta da API (array populado com categorias)
        this.categorias.set(response as any[])
      })
  }

}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-tarefas.html',
  styleUrl: './consulta-tarefas.css'
})
export class ConsultaTarefas {

  private http = inject(HttpClient)

  formulario = new FormGroup({
    dataHoraInicio: new FormControl(''),
    dataHoraFim: new FormControl(''),
  });

  onSubmit() {
    console.log(this.formulario.value);
    const dataHoraInicio = this.formulario.value.dataHoraInicio;
    const dataHoraFim = this.formulario.value.dataHoraFim;
    this.http.get('http://localhost:5182/api/Tarefas/' + dataHoraInicio + '/' + dataHoraFim)
      .subscribe(response => { //aguardando a resposta do backend
        console.table(response); //exibindo a resposta no console
      });

  }
}

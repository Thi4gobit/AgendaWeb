import { Routes } from '@angular/router';
import { CadastroTarefas } from './components/pages/cadastro-tarefas/cadastro-tarefas';
import { ConsultaTarefas } from './components/pages/consulta-tarefas/consulta-tarefas';
import { EdicaoTarefas } from './components/pages/edicao-tarefas/edicao-tarefas';
import { Dashboard } from './components/pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'pages/dashboard',
        component: Dashboard
    },
    {
        path: 'pages/cadastro-tarefas',
        component: CadastroTarefas
    },
    {
        path: 'pages/consulta-tarefas',
        component: ConsultaTarefas
    },
    {
        path: 'pages/edicao-tarefas',
        component: EdicaoTarefas
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: 'pages/dashboard'
    }
];

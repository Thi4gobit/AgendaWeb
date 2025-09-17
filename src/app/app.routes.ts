import { Routes } from '@angular/router';
import { CadastroTarefas } from './components/pages/cadastro-tarefas/cadastro-tarefas';
import { ConsultaTarefas } from './components/pages/consulta-tarefas/consulta-tarefas';
import { EdicaoTarefas } from './components/pages/edicao-tarefas/edicao-tarefas';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { AutenticarUsuario } from './components/pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './components/pages/criar-usuario/criar-usuario';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuario
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuario
    },
    {
        path: 'pages/dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'pages/cadastro-tarefas',
        component: CadastroTarefas,
        canActivate: [authGuard]
    },
    {
        path: 'pages/consulta-tarefas',
        component: ConsultaTarefas,
        canActivate: [authGuard]
    },
    {
        path: 'pages/edicao-tarefas',
        component: EdicaoTarefas,
        canActivate: [authGuard]
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];

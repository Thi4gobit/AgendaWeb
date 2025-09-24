import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {


  //Injeção de dependência
  const router = inject(Router);
  const auth = inject(AuthService);


  //Obter o usuário autenticado
  const user = auth.getUser();


  //Verificar se existe algum usuário autenticado
  if (user) {
    //permitir o acesso à rota
    return true;
  }
  else {
    //Redirecionar para a página de login
    router.navigate(['/pages/autenticar-usuario']);
    //Boquear o acesso a rota
    return false;
  }
};





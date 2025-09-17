import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // Redirecionar para a página de login
  const router = inject(Router);
  router.navigate(['pages/autenticar-usuario']);

  //Bloquear o acesso a rota
  return true;
};

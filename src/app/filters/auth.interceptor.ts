// src/app/interceptors/auth.interceptor.ts
import {
    HttpInterceptorFn,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {


    //Injeção de dependência
    const auth = inject(AuthService);


    // Lista de endpoints que devem ser interceptados (enviar o TOKEN JWT)
    const endpoints = [
        environment.apiTarefas,
        environment.apiCategorias,
        environment.apiDashboard,
    ];


    // Só intercepta se a URL começar com algum dos endpoints
    const deveInterceptar = endpoints.some(endpoint => req.url.startsWith(endpoint));


    // Só intercepta se a URL tiver como base o servidor desejado
    if (deveInterceptar) {


        // Recupera o dado do sessionStorage
        const user = auth.getUser();


        if (user) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            return next(authReq);
        }
    }


    // Se não cair nas condições acima, segue a requisição original
    return next(req);
}





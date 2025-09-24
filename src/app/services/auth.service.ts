import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AuthService {


    //Atributos
    private key: string = 'auth';


    //Método para salvar os dados do usuário autenticado
    //na sessão do navegador
    signIn(user: any): void {
        //Converter os dados do json para string
        const data = JSON.stringify(user);
        //Salvar os dados na sessão do navegador
        sessionStorage.setItem(this.key, data);
    }


    //Método para apagar os dados salvos na sessão
    signOut(): void {
        //Apagar os dados da sessão
        sessionStorage.removeItem(this.key);
    }


    //Método para retornar os dados do usuário autenticado na sessão
    getUser(): any | null {


        //Recuperar os dados gravados na sessão do navegador
        const data = sessionStorage.getItem(this.key);


        //Verificar se algum dado foi encontrado
        if(data) {
            //Converter os dados do string para json
            const user = JSON.parse(data);
            //Verificando se há um token
            if(user.accessToken) {
                //Retornar os dados do usuário autenticado
                return user;
            }
        }


        return null;
    }


}



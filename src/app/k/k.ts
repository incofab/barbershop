import { AlertController } from 'ionic-angular';
import { storage } from 'ionic/storage';

export class K {

    constructor(){

    }
    static TOKEN = 'token';
    /**
     * Creates basic alert
     */
    static alert(alertCtrl: AlertController, title: string, message:string){
        let alert = alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    static isEmpty(val:string): boolean{
        if(val == null) return true;
        if(val.length < 1) return true;
        return false;
    }

    static getBaseURL(): string{
        return 'http://localhost/barbershop/app/api/';
        // return 'http://www.barbershopconnectafrica.com/app/api/';
    }
    private static credentials:string = null;
    static getCredentials(): string{
        
        if(K.credentials != null) return K.credentials;
        
        let storage: Storage = new Storage();
        K.credentials = storage.getItem(K.TOKEN);
        // window.localStorage.getItem('');
        return K.credentials;
    }
    
    static setCredentials(value:string){
        let storage: Storage = new Storage();
        storage.setItem(K.TOKEN, value);
        K.credentials = value;
    }

    static isUserLoggedIn(): boolean{

        if(K.credentials != null) return true;
        
        let storage: Storage = new Storage();
        K.credentials = storage.getItem(K.TOKEN);
        if(K.credentials == null || K.credentials == '' || K.credentials == 'undefined'){
            return false;
        }

        return true;
    }

}
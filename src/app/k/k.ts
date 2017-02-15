import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

    static getMainBaseURL(): string{
        return 'http://localhost/barbershop/';
        // return 'http://www.barbershopconnectafrica.com/';
    }
    /**
     * API base URL
     */
    static getBaseURL(): string{
        return 'http://localhost/barbershop/app/api/';
        // return 'http://www.barbershopconnectafrica.com/app/api/';
    }

    private static credentials:string = null;

    static getCredentials(storage: Storage): string{
        
        if(K.credentials != null) return K.credentials;
        
        storage.get(K.TOKEN).then( (val) => {
            K.credentials = val;
            return K.credentials;
        });
        
    }
    
    static setCredentials(storage: Storage, value:string){
        storage.set(K.TOKEN, value);
        K.credentials = value;
    }

    static isUserLoggedIn(storage: Storage): boolean{

        if(K.credentials != null) return true;
        
        storage.get(K.TOKEN)
            .then( (val) => {
                K.credentials = val;        
                if(!K.credentials) return false;
                return true;
            });

    }

}
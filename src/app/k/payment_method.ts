import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../app/services/dashboard_service';
import { K } from './k';

export class PaymentMethod {

    cash:string = 'Cash';
    bankWire:string = 'Bank Wire';
    visa:string = 'Visa';
    masterCard:string = 'Master Card';

    savedMethods: string[] = [];
    // constructor(private alertCtrl: AlertController, 
    //     private loadingCtrl: LoadingController, private storage:Storage) {

    // }
    constructor(){

    }

    private selectPaymentMethods(loadingCtrl: LoadingController, alertCtrl: AlertController, 
        dService: DashboardService, storage: Storage){
            let alert = alertCtrl.create();
        alert.setTitle('Choose your prefered payment methods');

        alert.addInput({
            type: 'checkbox',
            label: 'Cash',
            value: this.cash,
            checked: this.check(this.cash),
        });

        alert.addInput({
            type: 'checkbox',
            label: 'Bank Wire',
            value: this.bankWire,
            checked: this.check(this.bankWire),
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Visa',
            value: this.visa,
            checked: this.check(this.visa),
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Master Card',
            value: this.masterCard,
            checked: this.check(this.masterCard),
        });

        alert.addButton('Cancel');
            alert.addButton({
            text: 'Ok',
            handler: data => {
                this.savedMethods = data;
                this.savePaymentMethod(loadingCtrl, alertCtrl, dService, storage);
            }
        });

        alert.present();
    }

    private check(val:string):boolean{
        if(this.savedMethods.indexOf(val) >= 0)
            return true;
        return false;
    }

    retrievePaymentMethod(loadingCtrl: LoadingController, alertCtrl: AlertController, 
        dService: DashboardService, storage: Storage){
         storage.get('payment_method').then(
            (val) => {
                if(val) {
                    this.savedMethods = val;
                }
                this.selectPaymentMethods(loadingCtrl, alertCtrl, dService, storage);
            }
        );     
    }

    private saveLocal(storage: Storage){
        storage.set('payment_method', this.savedMethods.join(', '));
    }

    private savePaymentMethod(loadingCtrl: LoadingController, alertCtrl: AlertController, 
        dService: DashboardService, storage: Storage){
    
        let loading = loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
        
        let body = new FormData();
        body.append('selected_methods', this.savedMethods.join(', '));

        dService.savePaymentMethod(body)
            .subscribe(response => { // On success
            if(response.success){
                K.alert(alertCtrl, 'Success', 'Payment method saved successfully');
                this.saveLocal(storage);
            }else{
                K.alert(alertCtrl, 'Failed', response.message);
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(alertCtrl, 'Failed', 'Sending failed');
            loading.dismiss();
        });

  }


}

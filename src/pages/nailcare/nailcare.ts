import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { GeneralService } from '../../app/services/general_service';

import { K } from '../../app/k/k';

@Component({
  selector: 'nailcare-page',
  templateUrl: 'nailcare.html',
  providers: [GeneralService]
})
export class NailCarePage {

    nailcareCenters: any;
    nailcareCentersNoPayment: any;
    constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
        private genService:GeneralService, private alertCtrl:AlertController) {

    }

    ngOnInit(){
        this.getNailCareCenters();
    }

    getNailCareCenters(){
        
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });

        loading.present();

        this.genService.getNailCareCenters().subscribe(response => { // On success
          
          if(response.success){
            this.nailcareCenters = response.result[0];
            this.nailcareCentersNoPayment = response.result[1];
          }
          loading.dismiss();
        //   console.log('on success called');
        },
        (err: any) => { // on error
            loading.dismiss();
            K.alert(this.alertCtrl, 'Network error', 'Data retrieval failed');
            // console.log('on Error called');
        });
    
    }


}


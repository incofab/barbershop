import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApplyModal } from '../apply/apply';
import { K } from '../../../app/k/k';

@Component({
  selector: 'detail-modal',
  templateUrl: 'detail.html'
})
export class DetailsModal {

    detail:any;
    constructor(public navCtrl: NavController, private params: NavParams,
        private alertCtrl: AlertController) {
        this.detail = params.get('detail');
    }



    apply(){
        if(!K.isUserLoggedIn()){
            K.alert(this.alertCtrl, "Notice:", 'You need to be logged in to apply');
            return;
        }
        this.navCtrl.push(ApplyModal,{
           detail : this.detail
        });
    }


}
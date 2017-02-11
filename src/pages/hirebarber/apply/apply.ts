import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,
    AlertController } from 'ionic-angular';
import { GeneralService } from '../../../app/services/general_service';
import { K } from '../../../app/k/k';

@Component({
  selector: 'apply-modal',
  templateUrl: 'apply.html',
  providers: [GeneralService],
})
export class ApplyModal {

    detail:any;
    experience:string;
    applicationMsg:string;

    constructor(public navCtrl: NavController, private params: NavParams,
         private genService:GeneralService, private loadingCtrl: LoadingController,
         private alertCtrl: AlertController) {
        this.detail = params.get('detail');
    }

    apply(){
        // post users application details
        console.log('experience = ' + this.experience 
            + ',  application message = ' + this.applicationMsg);
       
       let loading = this.loadingCtrl.create({
           content: 'Loading...',
           dismissOnPageChange: true
       });

        loading.present();
         // $applyjobid, $user_id, $_jobber_exp, $_jobber_comment, $poster_user_id
        let postData = {
            experience : this.experience,
            applicationMsg : this.applicationMsg,
            job_id : this.detail.job_id,
            poster_user_id : this.detail.poster_user_id, 
        };

        let ret = this.genService.applyAsBarber(postData);
        
        if(ret._isScalar == false){
            loading.dismiss();
            K.alert(this.alertCtrl, 'Error:', 'Application not sent');
            return;
        }

        ret.subscribe(response => {
            loading.dismiss();
            K.alert(this.alertCtrl, 'Sent!:', 'Application has been sent successfully');
        });

    }
    
    cancel(){
        this.navCtrl.pop();
    }



}
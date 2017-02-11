import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
    LoadingController } from 'ionic-angular';
import { Countries } from '../../app/k/countries';
import { K } from '../../app/k/k';
import { GeneralService } from '../../app/services/general_service';

@Component({
  selector: 'contact-us-home',
  templateUrl: 'contact.html',
  providers: [GeneralService]
})
export class ContactUsPage {

    firstname:string = '';
    lastname:string = '';
    email:string = '';
    subject:string = '';
    message:string = '';

  constructor(public navCtrl: NavController, private navParams: NavParams,
    private alertCtrl: AlertController, private genService:GeneralService,
    private loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
      
  }

  send(){
        
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
    });

    loading.present();
    
    let ret = this.genService.contactUs(this.firstname, 
        this.lastname, this.email, this.subject, this.message)
        .subscribe(response => {
        if(response.success)
            K.alert(this.alertCtrl, 'Success:', 'Your Message has been sent successfully');
        else K.alert(this.alertCtrl, 'Failed:', response.message);
        loading.dismiss();
    },
    (err: any) => { // on error
        loading.dismiss();
        K.alert(this.alertCtrl, 'Network error', 'Message sending failed');
    });

  }

}

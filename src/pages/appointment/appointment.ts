import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
    LoadingController } from 'ionic-angular';
import { Countries } from '../../app/k/countries';
import { K } from '../../app/k/k';
import { GeneralService } from '../../app/services/general_service';

@Component({
  selector: 'appointment-home',
  templateUrl: 'appointment.html',
  providers: [GeneralService]
})
export class AppointmentPage {

    sendTo:string = '';
    email:string = '';
    phone:string = '';
    date:string = '';
    arrivalTime:string = '';
    purpose:string = '';

  constructor(public navCtrl: NavController, private navParams: NavParams,
    private alertCtrl: AlertController, private genService:GeneralService,
    private loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
      
  }

  send(){
        
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
        dismissOnPageChange: true
    });

    loading.present();
    
    let ret = this.genService.bookAppointment(
        this.sendTo, this.email, this.phone, this.date, 
        this.arrivalTime, this.purpose
    );
    
    if(ret._isScalar == false){
        loading.dismiss();
         K.alert(this.alertCtrl, 'Error:', 'Could not connect to server');
        return;
    }

    ret.subscribe(response => {
        loading.dismiss();
        K.alert(this.alertCtrl, 'Success:', 'Your Message has been sent successfully');
    });

  }

}

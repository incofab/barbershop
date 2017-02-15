import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
    LoadingController } from 'ionic-angular';
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
    listngs:any;
    isListings:boolean = true;
    webRootPath:string = K.getMainBaseURL();

  constructor(public navCtrl: NavController, private navParams: NavParams,
    private alertCtrl: AlertController, private genService:GeneralService,
    private loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
      this.getListings();
  }

  getListings(){
        
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
    });

    loading.present();
    
    this.genService.listingsForAppointment()
    .subscribe(response => {
        this.listngs = response.result;
        loading.dismiss();
    },
    (err: any) => { // on error
        loading.dismiss();
        K.alert(this.alertCtrl, 'Network error', 'Data retrieval failed');
    });

  }

  send(){
        
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
    });

    loading.present();
    
    this.genService.bookAppointment(
        this.sendTo, this.email, this.phone, this.date, 
        this.arrivalTime, this.purpose)
        .subscribe(response => {
        if(response.success)
            K.alert(this.alertCtrl, 'Success:', 'Your Message has been sent successfully');
        else K.alert(this.alertCtrl, 'Failed:', response.message);

        loading.dismiss();
    },
    (err: any) => { // on error
        loading.dismiss();
        K.alert(this.alertCtrl, 'Network error', 'Data sending failed');
    });

  }

  bookAppointment(index:number){
      this.isListings = false;
      this.sendTo = this.listngs[index].email;
  }
  backToListings(){
      this.isListings = true;
  }

}

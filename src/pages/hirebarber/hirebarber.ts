import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,
    LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailsModal } from './detail/detail';
import { GeneralService } from '../../app/services/general_service';
import { K } from '../../app/k/k';

@Component({
  selector: 'page-hire-barber',
  templateUrl: 'hirebarber.html',
  providers: [GeneralService]
})
export class HireBarberPage {

  vacancies: any;

  constructor(public navCtrl: NavController, private params: NavParams,
        private alertCtrl: AlertController, private genService:GeneralService,
        private loadingCtrl: LoadingController, private storage: Storage) {
      this.loadVacancies();
  }

  loadVacancies(){
     
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
    });

    loading.present();
    
    this.genService.loadAllVacancies()
    .subscribe(response => {
        this.vacancies = response.result;
        loading.dismiss();
    },
    (err: any) => { // on error
        loading.dismiss();
        K.alert(this.alertCtrl, 'Network error', 'Data retrieval failed');
    });

  }

  openDetails(index){
      this.navCtrl.push(DetailsModal,{
           detail : this.vacancies[index]
      });
  }
  
    // apply(index:number){

    //     if(!K.isUserLoggedIn(this.storage)){
    //         K.alert(this.alertCtrl, "Notice:", 'You need to be logged in to apply');
    //         return;
    //     }
    //     this.navCtrl.push(ApplyModal,{
    //         detail : this.vacancies[index]
    //     });
    // }


}

interface Vacancy{
    title: string;
    company: string; 
    location: string;
    expirience: string;
}

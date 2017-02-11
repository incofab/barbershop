import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,
    LoadingController } from 'ionic-angular';
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
        private loadingCtrl: LoadingController) {
      this.loadVacancies();
  }

  loadVacancies(){
     
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
    });

    loading.present();
    
    let ret = this.genService.loadAllVacancies()
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


}

interface Vacancy{
    title: string;
    company: string; 
    location: string;
    expirience: string;
}

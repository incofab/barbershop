import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Countries } from '../../app/k/countries';
import { BarberSchoolListsPage } from './barber_school_lists/barber_school_lists';
import { GeneralService } from '../../app/services/general_service';
import { K } from '../../app/k/k';

@Component({
  selector: 'barber-school-home',
  templateUrl: 'barber_school.html',
  providers: [GeneralService]
})
export class BarberSchoolPage {

    countries:string[] = [];
    states:string[] = [];

    selectedCountryIndex:number = -1;
    selectedStateIndex:number = -1;
    
    k_country:Countries = null;

  constructor(public navCtrl: NavController, private navParams: NavParams,
    private alertCtrl: AlertController, private genService:GeneralService,
    private loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
      this.k_country = new Countries();
      this.countries = this.k_country.getCountries();
  }

  getState(){
      if(this.selectedCountryIndex < 0) return;
      this.states = this.k_country.getStates(this.selectedCountryIndex);
  }

  gotoListsPage(){

      if(this.selectedCountryIndex < 0 || this.selectedStateIndex < 0){
        K.alert(this.alertCtrl, 'Invalid Request', 'Select a Country and state');
        return;
      }
      
      let loading = this.loadingCtrl.create({
          content: 'Loading...',
      });

      loading.present();

      this.genService.getBarberSchoolLists(
          this.countries[this.selectedCountryIndex],
          this.states[this.selectedStateIndex], false
        ).subscribe(response => {
        //   console.log(response);
          loading.dismiss();
          if(response.success){
              this.navCtrl.push(BarberSchoolListsPage, {
                schools: response.result,
            });
        }
        },
        (err: any) => { // on error
            loading.dismiss();
            K.alert(this.alertCtrl, 'Network error', 'Data retrieval failed');
        });

  }

  viewAll(){

      let loading = this.loadingCtrl.create({
          content: 'Loading...',
      });

      loading.present();

      this.genService.getBarberSchoolLists(
          null, null, true).subscribe(response => {
        //   console.log(response);
          loading.dismiss();
          if(response.success){
              this.navCtrl.push(BarberSchoolListsPage, {
                schools: response.result[0],
                schools_no_payment: response.result[1],
            });
        }
        },
        (err: any) => { // on error
            loading.dismiss();
            K.alert(this.alertCtrl, 'Network error', 'Data retrieval failed');
        });

  }


}

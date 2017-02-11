import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
    LoadingController } from 'ionic-angular';
import { Countries } from '../../app/k/countries';
import { K } from '../../app/k/k';
import { GeneralService } from '../../app/services/general_service';

@Component({
  selector: 'barber-shop-home',
  templateUrl: 'barbershops.html',
  providers: [GeneralService]
})
export class BarberShopsPage {

    countries:string[] = [];
    states:string[] = [];

    selectedCountryIndex:number = -1;
    selectedStateIndex:number = -1;
    countrySelected:boolean = false;
    shops:any;
    
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

  listShops(){
    
    if(this.selectedCountryIndex < 0 || this.selectedStateIndex < 0){
        K.alert(this.alertCtrl, 'Invalid Request', 'Select a Country and state');
        return;
    }
    
    let loading = this.loadingCtrl.create({
        content: 'Loading...',
    });

    loading.present();
    
     this.genService.getBarberShopsLists(
         this.countries[this.selectedCountryIndex], 
         this.states[this.selectedStateIndex]).subscribe(response => {
            console.log(response);
            if(response.success){
                this.countrySelected = true;
                this.shops = response.result;
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            loading.dismiss();
            K.alert(this.alertCtrl, 'Network error', 'Data retrieval failed');
        });

  }


//   dummyshops(){
//       let shops = [];
//       for(let i = 0; i<10; i++){
//           shops[i] = {
//               title: 'Lorem ipsum dolor sit amet, consectetur',
//               name: 'Omega barbers',
//               address: 'elit. Quisquam numquam odit sint a eos incidunt consequuntur',
//               phone: '070434565664',
//               email: 'mail@yahoo.com',
//               rating: 4
//           }
//       }
//       return shops;
//   }

}

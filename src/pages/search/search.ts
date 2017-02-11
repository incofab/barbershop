import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { GeneralService } from '../../app/services/general_service';
import { K } from '../../app/k/k';
import { Countries } from '../../app/k/countries';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchBarberShopPage {

    shops: any = [];
    showSearchResults:boolean = false;
    shopName:string = '';
    selectedCountry: string = '';
    nearMe: boolean = true;
    countries:string[] = null;
    countriesObj:Countries = null;

    constructor(public navCtrl: NavController,
        private loadingCtrl: LoadingController, 
        private alertCtrl: AlertController, 
        private genService: GeneralService) {
        
    }

    ngOnInit(){
        this.countriesObj = new Countries();
        this.countries = this.countriesObj.getCountries();
    }

    search(){
        
        let loading = this.loadingCtrl.create({
           content: 'Loading...',
           dismissOnPageChange: true
        });

        loading.present();
        
        let ret = this.genService.searchFavouriteBarberShop(
            this.shopName, this.selectedCountry, this.nearMe
        );
        
        if(ret._isScalar == false){
            loading.dismiss();
            K.alert(this.alertCtrl, 'Error:', 'Could not connect to server');
            return;
        }

        ret.subscribe(response => {
            loading.dismiss();
            this.showSearchResults = true;
            this.shops = response.json();            
            this.shops = this.dummyShops();            
        });

    }

    dummyShops(){
        let arr = [];
        for(let i = 0; i<10; i++){
            arr[i] = {
                shop_name : 'Lorem ipsum dolor sit amet',
                location: 'consectetur adipisicing elit. Tenetur, veritatis.',
                phone: '459495457384'
            }
        }
        return arr;
    }



}
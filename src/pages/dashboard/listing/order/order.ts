import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Countries } from '../../../../app/k/countries';
import { DashboardService } from '../../../../app/services/dashboard_service';
import { K } from '../../../../app/k/k';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [DashboardService]
})
export class OrderPage {

    countries:string[] = [];
    states:string[] = [];
    selectedCountryIndex:number = -1;
    selectedStateIndex:number = -1;
    k_country:Countries = null;

    product:any;
    name:string;
    price:any;
    billing_period:string;
    weekDays: WeekDay[] = [];

    // Fields
    title:string;
    logo:string;
    phone:string;
    email:string;
    website:string;
    zipcode:string;
    city:string;

    // Categories
    cat1:boolean = false;
    cat2:boolean = false;
    cat3:boolean = false;

    address:string;
    location:string;
    radius:string;
    latitude:string;
    longitude:string;

    classified:string;
    imageGallery:string;
    description:string;
    descriptionImage:string;
    shortDescription:string;
    sideBanner:string;
    topBanner:string;


    constructor(public navCtrl: NavController,private alertCtrl: AlertController, 
        private dService:DashboardService, private loadingCtrl: LoadingController,
        private params: NavParams) {

        this.product = params.get('product');
        this.name = params.get('name');
        this.price = params.get('price');
        this.billing_period = params.get('billing_period');

    }

    ngOnInit(){
        let days: string[] = ['Monday', 'Tuesdays', 'Wednesday', 'Thursday', 
        'Friday', 'Saturday', 'Sunday'];
        for(let i:number = 0; i < 7; i++){
            this.weekDays[i] = {
                day: days[i],
                hours_start : 'Closed',
                hours_end: 'Closed'
            };
        }
      this.k_country = new Countries();
      this.countries = this.k_country.getCountries();
      console.log('pdi = ' + this.product[0].pid);
    }
    
    getState(){
      if(this.selectedCountryIndex < 0) return;
      this.states = this.k_country.getStates(this.selectedCountryIndex);
    }

    register(){
        
      if(this.selectedCountryIndex < 0 || this.selectedStateIndex < 0){
        K.alert(this.alertCtrl, 'Invalid Request', 'Select a Country and state');
        return;
      }

        let body = new FormData();
        body.append('title', this.title);
        body.append('logo', this.logo);
        this.weekDays.forEach((val) => {
            body.append('hours_weekday[]', val.day);
            body.append('hours_start[]', val.hours_start);
            body.append('hours_end[]', val.hours_end);
        });
        body.append('phone', this.phone);
        body.append('pemail', this.email);
        body.append('pemail', this.email);
        body.append('website', this.website);
        body.append('zipcode', this.zipcode);
        
        body.append('country', this.countries[this.selectedCountryIndex]);
        body.append('state', this.states[this.selectedStateIndex]);
        body.append('city', this.city);
        body.append('cat1', this.cat1);
        body.append('cat2', this.cat2);
        body.append('cat3', this.cat3);

        body.append('address', this.address);
        body.append('us3-address', this.location);
        body.append('us3-radius', this.radius);
        body.append('latitude', this.latitude);
        body.append('longitude', this.longitude);

        body.append('imageclassified', this.classified);
        body.append('imagegallery', this.imageGallery);
        body.append('listing_description', this.description);
        body.append('description_image', this.descriptionImage);
        body.append('short_description', this.shortDescription);
        body.append('imageside_banner', this.sideBanner);
        body.append('imagetop_banner', this.topBanner);

        body.append('Reviews', '');
        body.append('Ratings', '');
        body.append('Suggestions', '');
        body.append('product_id', this.product[0].pid);
        body.append('product_price', this.price);


        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
    
        this.dService.registerOrder(body)
            .subscribe(response => { // On success
            if(response.success){
                K.alert(this.alertCtrl, 'Success', 'Data recorded successfully');
            }else{
                K.alert(this.alertCtrl, 'Failed', 'Data recording Failed');
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Network Error', 'Server could not be reached');
            loading.dismiss();
        });

    }

}

interface WeekDay{
    day: string;
    hours_start: string;
    hours_end: string;
}

import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';
import { ProductPage } from './product/product';

@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
  providers: [DashboardService]
})
export class ListingsPage {

    allAdvert:any; 
    products:any;

    activeCategory:number = 0;

    constructor(public navCtrl: NavController,private alertCtrl: AlertController, 
        private dService:DashboardService, private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        this.getAllAdverts();
    }

    openDetails(index:number){
        let product = this.products[index];
        this.navCtrl.push(ProductPage, {
            product: product,
            name: this.allAdvert[index].pname,
            price: this.allAdvert[index].price,
            billing_period: this.allAdvert[index].billing_period,
        });
    }

    getAllAdverts(){
    
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
    
        this.dService.getAllPricing()
            .subscribe(response => { // On success
            if(response.success){
                this.allAdvert = response.result[0];
                this.products = response.result[1];
            }else{
                K.alert(this.alertCtrl, 'Failed', 'Data retrieval Failed');
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Network Error', 'Data retrieval Failed');
            loading.dismiss();
        });

  }


}

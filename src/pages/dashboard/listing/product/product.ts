import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DashboardService } from '../../../../app/services/dashboard_service';
import { K } from '../../../../app/k/k';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers: [DashboardService]
})
export class ProductPage {

    products:any;
    name:string;
    price:any;
    billing_period:string;

    constructor(public navCtrl: NavController,private alertCtrl: AlertController, 
        private dService:DashboardService, private loadingCtrl: LoadingController,
        private params: NavParams) {

        this.products = params.get('product');
        this.name = params.get('name');
        this.price = params.get('price');
        this.billing_period = params.get('billing_period');
        console.log(this.products);
    }

    ngOnInit(){
        
    }

    orderNow(){
        this.navCtrl.push(OrderPage, {
            product: this.products,
            name: this.name,
            price: this.price,
            billing_period: this.billing_period,
        });
    }

}

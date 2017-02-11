import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {SERVER_URL} from './config';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import { K } from '../../app/k/k';

@Injectable()
export class DashboardService {

    constructor(private http: Http, private storage:Storage){

    }
    /**
     * Helper function to concatenate the token key and values together
     */
    private token(): string{
        return K.TOKEN + '=' + K.getCredentials(this.storage);
    }

   login(username:string, password:string){
       
       let url: string = K.getBaseURL() + 'login.php?r=login';
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('email', username);
        body.append('password', password);

        return this.http.post(url, body).map(res => res.json());

   }

   post_a_job(values:any){
       
       let url: string = K.getBaseURL() + 'dashboard_api.php?r=post_a_job&'
            + this.token();
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('jobTitle', values.jobTitle);
        body.append('companyName', values.companyName);
        body.append('location', values.location);
        body.append('jobDesc', values.jobDesc);
        body.append('specification', values.specification);
        body.append('jobType', values.jobType);
        body.append('experience', values.experience);
        body.append('salary', values.salary);
        body.append('deadLine', values.deadLine);
        body.append('phone', values.phone);
        body.append('email', values.email);
        body.append('name', values.name);
        body.append('category', values.category);

        return this.http.post(url, body, headers).map(res => res.json());

   }

   viewPostedJobs(){
       let url: string = K.getBaseURL() + 'dashboard_api.php?r=view_posted_jobs&'
            + this.token();

       return this.http.get(url).map(res => res.json());
   }

   viewAppliedJobs(){
        let url: string = K.getBaseURL() + 'dashboard_api.php?r=view_applied_jobs&'
            + this.token();

       return this.http.get(url).map(res => res.json());
   }

   post_space(values:any){
       
        let url: string = K.getBaseURL() + 'dashboard_api.php?r=post_space&'
            + this.token();
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('space_title', values.spaceTitle);
        body.append('amount', values.amount);
        body.append('location', values.location);
        body.append('phone', values.phone);
        body.append('email', values.email);
        body.append('description', values.description);

        return this.http.post(url, body, headers).map(res => res.json());

   }

   rent_space(values:any){
       
        let url: string = K.getBaseURL() + 'dashboard_api.php?r=rent_space&'
            + this.token();
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('space_title', values.spaceTitle);
        body.append('location', values.location);
        body.append('type', values.type);
        body.append('size', values.size);
        body.append('phone', values.phone);
        body.append('email', values.email);
        body.append('description', values.description);

        return this.http.post(url, body, headers).map(res => res.json());
   }

   /**
    * Retrieves both load listings and services & products listings
    */
   retrieveListings(){
        let url: string = K.getBaseURL() + 'dashboard_api.php?r=services_retrieve_listings&'
            + this.token();

       return this.http.get(url).map(res => res.json());
   }

   registerProductsAndServices(listingID: string, servicesAndProducts:string, price:string){
       
        let url: string = K.getBaseURL() + 'dashboard_api.php?r=register_service_product&'
            + this.token();
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('listing_id', listingID);
        body.append('service_and_product', servicesAndProducts);
        body.append('price', price);

        return this.http.post(url,body, headers).map(res => res.json());

   }

   signup(values:any){
       
        let url: string = K.getBaseURL() + 'register.php?r=register&';
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('firstname', values.firstname);
        body.append('lastname', values.lastname);
        body.append('username', values.username);
        body.append('password', values.password);
        body.append('email', values.email);
        body.append('phone', values.phone);
        body.append('organisation', values.organisation);
        body.append('country', values.country);

        return this.http.post(url, body, headers).map(res => res.json());

   }

}
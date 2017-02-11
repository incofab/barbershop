import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {SERVER_URL} from './config';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import { K } from '../../app/k/k';

@Injectable()
export class GeneralService {

    // private barberSchoolLists: any;
    // private barberShopsLists: any = null;
    constructor(private http: Http, private storage:Storage){

    }

   getBarberSchoolLists(country:string, state:string, viewAll:boolean){
       
       let url: string = K.getBaseURL() + 'general_api.php?r=barber_school_list';

       if(!viewAll) url += `&country=${country}&state=${state}`;
       
       return this.http.get(url).map(res => res.json());
   }

   getBarberShopsLists(country:string, state:string, viewAll:boolean){

       let url: string = K.getBaseURL() + 'general_api.php?r=barber_shop_list';

       if(!viewAll) url += `&country=${country}&state=${state}`;
            
       return this.http.get(url).map(res => res.json());
   }

    getNailCareCenters(){

        let url: string = K.getBaseURL() + 'general_api.php?r=nail_care_list';
            
        return this.http.get(url).map(res => res.json());
    }

    loadAllVacancies(){

        let url: string = K.getBaseURL() + 'general_api.php?r=all_vacancies';
            
        return this.http.get(url).map(res => res.json());
    }

    // Need to login before u can apply
    applyAsBarber(values:any){
        
       let url: string = K.getBaseURL() + 'general_api.php?r=apply_job&'
            + K.TOKEN + '=' + K.getCredentials(this.storage);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('experience', values.experience);
        body.append('comment', values.applicationMsg);
        body.append('poster_user_id', values.poster_user_id);
        body.append('apply_job_id', values.job_id);

        return this.http.post(url, body,headers).map(res => res.json());

    }

    // Not done yet
    getForumPosts(){
         
        let url: string = '';
            
        return this.http.get(url).map(res => res.json());
    }

    searchFavouriteBarberShop(shopName:string, country:string, nearMe:boolean){
        
        let url: string = K.getBaseURL() + 'general_api.php?r=search_barbershop'
            + '&search=' + shopName + '&country=' + country
            + '&near_me=' + nearMe;
            
        return this.http.get(url).map(res => res.json());
    }
    
    listingsForAppointment(){
        let url: string = K.getBaseURL() + 'general_api.php?r=appointment';
        return this.http.get(url).map(res => res.json());
    }

    bookAppointment(sendTo: string, email:string, phone:string,
        date:string, arrivalTime:string, purpose:string){

        let url: string = K.getBaseURL() + 'general_api.php?r=appointment';

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('to', sendTo);
        body.append('email', email);
        body.append('phone', phone);
        body.append('date', date);
        body.append('arrival_time', arrivalTime);
        body.append('purpose', purpose);
        body.append('book_appointment', true);

        return this.http.post(url, body,headers).map(res => res.json());

    }

    contactUs(firstname: string, lastname:string, email:string, subject:string,
        message:string){

        let url: string = K.getBaseURL() + 'general_api.php?r=contact_us';

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = new FormData();
        body.append('firstname', firstname);
        body.append('lastname', lastname);
        body.append('email', email);
        body.append('subject', subject);
        body.append('message', message);

        return this.http.post(url, body,headers).map(res => res.json());
    }


}
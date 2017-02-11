import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsModal } from './detail/detail';

@Component({
  selector: 'page-hire-barber',
  templateUrl: 'hirebarber.html'
})
export class HireBarberPage {

    vacancies: Vacancy[] = [];
    searchword: string = '';

  constructor(public navCtrl: NavController, private params: NavParams) {
      this.loadVacancies();
  }

  loadVacancies(){

      for(let i:number = 0; i < 10; i++){
        this.vacancies.push({
            title : 'title',
            company : 'company',
            location : 'location',
            expirience : 'experience',
        });
      }

    console.log(this.vacancies);
      
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

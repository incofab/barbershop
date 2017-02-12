import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';

@Component({
  selector: 'page-post-job',
  templateUrl: 'template.html',
  providers: [DashboardService]
})
export class PostAJobPage {

    jobTitle:string;
    companyName:string;
    location:string;
    jobDesc:string;
    specification:string;
    jobType:string;
    experience:string;
    salary:string;
    deadLine:string;
    phone:string;
    email:string;
    name:string;

    POST_AS_A_BARBER:number = 0;
    HIRE_A_BARBER:number = 1;
    HIRE_A_MANICURIST:number = 2;
    // categoryArr:string[] = ['post_as_a_barber','Hire a Barber', 'post_as_a_manicurist'];
    activeCategory:number = 0;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        
    }

    postJobAs(index:number){
        this.activeCategory = index;
    }

    post_a_job(){
    
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
        let postData = {
            jobTitle: this.jobTitle,
            companyName: this.companyName,
            location: this.location,
            jobDesc: this.jobDesc,
            specification: this.specification,
            jobType: this.jobType,
            experience: this.experience,
            salary: this.salary,
            deadLine: this.deadLine,
            phone: this.phone,
            email: this.email,
            name: this.name,
            category: this.activeCategory,
        };
        this.dService.post_a_job(postData)
            .subscribe(response => { // On success
            if(response.success){
                K.alert(this.alertCtrl, 'Success', 'Post sent successfully');
                this.clearFields();
            }else{
                K.alert(this.alertCtrl, 'Success', response.message);
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Sending failed');
            loading.dismiss();
        });

  }

  clearFields(){
      this.jobTitle = '';
      this.companyName = '';
      this.location = '';
      this.jobDesc = '';
      this.specification = '';
      this.jobType = '';
      this.experience = '';
      this.salary = '';
      this.deadLine = '';
      this.email = '';
      this.name = '';
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from './transaction';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.page.html',
  styleUrls: ['./calculate.page.scss'],
})
export class CalculatePage implements OnInit {

  typeValue :any;
  typeText : String ="";

  regionValue :any;
  regionText : String ="";

  givenAmountText :  String="";
  resultAmountText : String ="";

  givenAmount : number;
  resultAmount : number;

  transaction = new  Transaction();

  fees :any[];

  fees_tn :any[];

  valuer:any;
  constructor(private activedRoute:ActivatedRoute,public alertController: AlertController,public toastController: ToastController) { }

  ngOnInit() {

    this.fees = [
      {'min':5000,'max':8999,'frais':1500},
      {'min':9000,'max':15000,'frais':2500},
      {'min':1501,'max':20000,'frais':3500},
      {'min':20001,'max':30000,'frais':4500},
      {'min':30001,'max':49999,'frais':6000},
    ];

    this.fees_tn = [
      {'min':25,'max':50,'frais':1500},
      {'min':50,'max':100,'frais':2500},
      {'min':100,'max':150,'frais':3500},
      {'min':150,'max':250,'frais':4500},
    ];

    this.typeValue = this.activedRoute.snapshot.params.type;

    this.regionValue = this.activedRoute.snapshot.params.region;

    if(this.typeValue == "sending" && this.regionValue =="cf"){
      this.typeText = "Envoie: Centrafrique - Tunisie";
      this.givenAmountText = "J'envoi (FCFA)";
    }
    else if(this.typeValue == "reception" && this.regionValue =="cf"){
      this.typeText = "Reception: Centrafrique - Tunisie";
      this.givenAmountText = "Je veux recevoir (FCFA)";
    }
    else if(this.typeValue == "sending" && this.regionValue =="tn"){
      this.typeText = "Envoie: Tunisie - Centrafrique";
      this.givenAmountText = "J'envoi (DT)";
    }
    else if(this.typeValue == "reception" && this.regionValue =="tn"){
      this.typeText = "Reception: Tunisie - Centrafrique";
      this.givenAmountText = "Je veux recevoir (DT)";
    }

  }

  convertir(){
    var message;
    switch (this.typeValue) {
      case "sending":
        if(this.regionValue =="cf"){ //envoie cf
          if(this.transaction.givenAmount == 5000)
          {
              this.transaction.resultAmount = (this.transaction.givenAmount -1500) / 200;
          }
          else if(this.transaction.givenAmount == 10000)
          {
              this.transaction.resultAmount = (this.transaction.givenAmount -2500) / 200;
          }
          else if( this.transaction.givenAmount >= 50000 && this.transaction.givenAmount<=150000){

              this.transaction.resultAmount = (this.transaction.givenAmount - (this.transaction.givenAmount*0.13)) / 200;
          }
          else if( this.transaction.givenAmount >= 150001 && this.transaction.givenAmount<=200000){
            this.transaction.resultAmount = (this.transaction.givenAmount - (this.transaction.givenAmount* 0.125)) / 200;
          }
          else if( this.transaction.givenAmount >= 200001 && this.transaction.givenAmount<=500000){
            this.transaction.resultAmount = (this.transaction.givenAmount - (this.transaction.givenAmount* 0.12)) / 200;
          }
          else{
              var pricing =  this.fees.find(f =>  f.min <= this.transaction.givenAmount && f.max >= this.transaction.givenAmount);
              if(pricing !=null){
                this.transaction.resultAmount = (this.transaction.givenAmount -pricing.frais ) / 200;
              }else{
                this.presentToastCF();
                return null;
              }
          }   
          message = "Vous allez  recevoir (DT)";
        }else if(this.regionValue == "tn"){ //envoie tn
          if(this.transaction.givenAmount == 25)
          {
              this.transaction.resultAmount = (this.transaction.givenAmount -7.5) * 200;
          }
          else if( this.transaction.givenAmount >= 250 && this.transaction.givenAmount<=1000){

              this.transaction.resultAmount = (this.transaction.givenAmount - (this.transaction.givenAmount*0.10)) * 200;
          }
          else if( this.transaction.givenAmount >= 1000 && this.transaction.givenAmount<=2500){
            this.transaction.resultAmount = (this.transaction.givenAmount - (this.transaction.givenAmount* 0.5)) * 200;
          }
          else{
              var pricing =  this.fees_tn.find(f =>  f.min <= this.transaction.givenAmount && f.max >= this.transaction.givenAmount);
              if(pricing !=null){
                this.transaction.resultAmount = (this.transaction.givenAmount -(pricing.frais/200) ) * 200;
              }else{
                this.presentToastTN();
                return null;
              }
          } 
          message = "Le bénéficiaire reçoit (FCFA)";
        }
        break;
      case "reception": //reception cf
        if(this.regionValue =="cf"){
          if(this.transaction.givenAmount == 5000)
          {
              this.transaction.resultAmount = (this.transaction.givenAmount +1500) / 200;
          }
          else if( this.transaction.givenAmount >= 50000 && this.transaction.givenAmount<=150000){

              this.transaction.resultAmount = (this.transaction.givenAmount + (this.transaction.givenAmount*0.13)) / 200;
          }
          else if( this.transaction.givenAmount >= 155000 && this.transaction.givenAmount<=500000){
            this.transaction.resultAmount = (this.transaction.givenAmount + (this.transaction.givenAmount* 0.12)) / 200;
          }
          else{
              var pricing =  this.fees.find(f =>  f.min <= this.transaction.givenAmount && f.max >= this.transaction.givenAmount);
              if(pricing !=null){
                this.transaction.resultAmount = (this.transaction.givenAmount +pricing.frais ) / 200;
              }else{
                this.presentToastCF();
                return null;
              }
          }  
          message = "Montant à envoyer (DT)";
        }else if(this.regionValue == "tn"){ //reception tn
          if(this.transaction.givenAmount == 25)
          {
              this.transaction.resultAmount = (this.transaction.givenAmount +7.5) * 200;
          }
          else if( this.transaction.givenAmount >= 250 && this.transaction.givenAmount<=1000){

              this.transaction.resultAmount = (this.transaction.givenAmount + (this.transaction.givenAmount*0.10)) * 200;
          }
          else if( this.transaction.givenAmount >= 1000 && this.transaction.givenAmount<=2500){
            this.transaction.resultAmount = (this.transaction.givenAmount + (this.transaction.givenAmount* 0.5)) * 200;
          }
          else{
              var pricing =  this.fees_tn.find(f =>  f.min <= this.transaction.givenAmount && f.max >= this.transaction.givenAmount);
              if(pricing !=null){
                this.transaction.resultAmount = (this.transaction.givenAmount +(pricing.frais/200) ) * 200;
              }else{
                this.presentToastTN();
                return null;
              }
          } 
          message = "Montant à envoyer (FCFA)";
        }
        break;
      default:
        break;
    }
    this.presentAlertConfirm(this.transaction.resultAmount,message);
  }

  async presentAlertConfirm(value:any,message:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Confirmation !",
      message:'<strong>'+message+' :</strong> '+value.toFixed(2),
      buttons: [
         {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToastCF() {
    const toast = await this.toastController.create({
      message: 'Montant requit entre 5 000 - 500 000.',
      position : 'top',
      icon: 'information-circle',
      color:'danger',
      duration: 3000
    });
    toast.present();
  }

  async presentToastTN() {
    const toast = await this.toastController.create({
      message: 'Montant requit entre 25 - 2 500.',
      position : 'top',
      icon: 'information-circle',
      color:'danger',
      duration: 3000
    });
    toast.present();
  }
}

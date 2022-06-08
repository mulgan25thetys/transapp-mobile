import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatePageRoutingModule } from './calculate-routing.module';

import { CalculatePage } from './calculate.page';
import { ConvertisseurComponent } from './components/convertisseur/convertisseur.component';

@NgModule({
  entryComponents : [ConvertisseurComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatePageRoutingModule,
    FormsModule
  ],
  declarations: [CalculatePage,ConvertisseurComponent]
})
export class CalculatePageModule {}

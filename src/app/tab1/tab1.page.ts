import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ParametrosService } from '../parametros.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private parametros: ParametrosService,
    private route: Router,
    private platform: Platform
  ) {
  }

  scanearCodigo() {
    this.escanearYRedirigir();
  }

  private escanearYRedirigir() {
    if (this.platform.is('cordova')) {
      BarcodeScanner.scan().then(barcodeData => {
        this.procesarCodigoDeBarras(barcodeData.text);
        console.log('Barcode data', barcodeData);
      }).catch(err => {
        console.log('Error', err);
      });
    } else {
      this.procesarCodigoDeBarras(prompt('Digite el codigo de barras'));
    }
  }

  private procesarCodigoDeBarras(barcodeData) {
    this.parametros.setParam('code', barcodeData);
    this.route.navigateByUrl('tabs/tab2');
  }
}

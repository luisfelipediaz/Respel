import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParametrosService } from '../parametros.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  residuo$: Observable<any>;
  detailsVisible = false;

  constructor(
    private parametros: ParametrosService,
    private fs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parametros.getParam('code').subscribe((barcode) => {
      this.detailsVisible = false;
      if (!!barcode) {
        this.residuo$ = this.fs.doc(`residuos/${barcode}`).valueChanges();
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  getUrl(residuo): string {
    return `assets/iconosrespel/${residuo.imagen}.jpg`;
  }

  showDetails() {
    this.detailsVisible = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParametrosService } from '../parametros.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  residuo$: Observable<any>;

  constructor(
    private parametros: ParametrosService,
    private fs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parametros.getParam('code').subscribe((barcode) => {
      if (!!barcode) {
        this.residuo$ = this.fs.doc(`residuos/${barcode}`).valueChanges();
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  getUrl(residuo): string {
    return `assets/iconosrespel/${residuo.imagen3}`;
  }

  volver() {
    this.router.navigateByUrl('/');
  }
}

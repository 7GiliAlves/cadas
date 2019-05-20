import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Cadas } from '../../../interface/cadas.interface';
import { CadasDialogComponent } from '../cadas-dialog/cadas-dialog.component';

@Component({
  selector: 'app-cadas-list',
  templateUrl: './cadas-list.component.html',
  styleUrls: ['./cadas-list.component.scss']
})
export class CadasListComponent implements OnInit {
  selectedCadas: Cadas;
  type = 'nome';

  searchTerm = '';
  searchCadas;

  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private dialog: MatDialog, private afs: AngularFirestore) {}

  ngOnInit() {
    this.getCadas();
    this.getCombined();
  }

  showDialog(cadas?: Cadas): void {
    const config: MatDialogConfig<any> = cadas ? { data: { cadas } } : null;
    this.dialog.open(CadasDialogComponent, config);
  }

  search($event) {
    const value = $event.target.value.toUpperCase();

    if (value !== '') {
      this.startAt.next(value);
      this.endAt.next(value + '\uf8ff');
    } else {
      this.getCadas();
    }
  }

  getCadas() {
    this.getDtUpdate().subscribe(cadas => {
      this.searchCadas = cadas;
    });
  }

  getCombined() {
    const combined = combineLatest(this.startobs, this.endobs);
    combined.subscribe(value => {
      this.firequery(value[0], value[1]).subscribe(cadas => {
        this.searchCadas = cadas;
      });
    });
  }

  firequery(start: {}, end: {}) {
    return this.afs
      .collection('cadas', ref =>
        ref
          .limit(8)
          .orderBy(this.type, 'asc')
          .startAt(start)
          .endAt(end)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(cadas => {
            const data = cadas.payload.doc.data() as Cadas;
            data.uid = cadas.payload.doc.id;
            return data;
          });
        })
      );
  }

  getDtUpdate() {
    return this.afs
      .collection('cadas', ref => ref.limit(8).orderBy('dtUpdate', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(cadas => {
            const data = cadas.payload.doc.data() as Cadas;
            data.uid = cadas.payload.doc.id;
            return data;
          });
        })
      );
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Cadas } from 'src/app/interface/cadas.interface';
import { CadasDialogComponent } from '../cadas-dialog/cadas-dialog.component';
import { CadasConfirmComponent } from '../cadas-confirm/cadas-confirm.component';

@Component({
  selector: 'app-cadas-item',
  templateUrl: './cadas-item.component.html',
  styleUrls: ['./cadas-item.component.scss']
})
export class CadasItemComponent implements OnInit {

  @Input() cadas: Cadas;
  @Output() selectCadas = new EventEmitter<Cadas>();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  executeAction(action: string): void {
    this[action].emit(this.cadas);
  }

  showDialog (cadas?: Cadas): void {
    const config: MatDialogConfig<any> =
    (cadas) ? {data: { cadas } } : null;
    this.dialog.open(CadasDialogComponent, config);
  }

  openDialog(cadas?: Cadas): void {
    const config: MatDialogConfig<any> =
    (cadas) ? {data: { cadas } } : null;
    this.dialog.open(CadasConfirmComponent, config);
  }

}

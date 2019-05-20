import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CadasService } from 'src/app/services/cadas.service';
import { Cadas } from 'src/app/interface/cadas.interface';

@Component({
  selector: 'app-cadas-confirm',
  templateUrl: './cadas-confirm.component.html',
  styleUrls: ['./cadas-confirm.component.scss']
})
export class CadasConfirmComponent implements OnInit {

  cadas: Cadas;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private cadasService: CadasService,

  ) { }

  ngOnInit() {
    if (this.data) {
      this.cadas = this.data.cadas;
    }
  }

  onDelete (cadas: Cadas): void {
    this.cadasService.deleteCadas(cadas)
    .then(() =>
      this.cadasService.openSnackBar(`Pronto Cadastro ${cadas.nome} Apagado!`, 'APAGADO'))
    .catch(() =>
      this.cadasService.openSnackBar(`Erro ao Apagar ${this.cadas.nome}`, 'CANCELADO'));
  }
}

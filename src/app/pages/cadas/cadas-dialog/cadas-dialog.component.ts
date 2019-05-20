import { Component, OnInit, Inject } from '@angular/core';
import { Cadas } from 'src/app/interface/cadas.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CadasService } from 'src/app/services/cadas.service';

@Component({
  selector: 'app-cadas-dialog',
  templateUrl: './cadas-dialog.component.html',
  styleUrls: ['./cadas-dialog.component.scss']
})
export class CadasDialogComponent implements OnInit {

  currentDate = Date.now();
  buttonTitle = 'Salvar';
  dialogTitle = 'Adicionar novo cadastro ao Cadas';
  cadas: Cadas =
    {
      nome: '',
      dtNascimento: '',
      numCaixa: '',
      ordem: '',
      observacao: ''
    };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CadasDialogComponent>,
    private cadasService: CadasService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.buttonTitle = 'Editar';
      this.dialogTitle = 'Editar Cadastro do Cadas';
      this.cadas = this.data.cadas;
    }
  }

  onSave(): void {
    this.cadas.dtUpdate = this.currentDate;
    this.cadas.nome = this.cadas.nome.toUpperCase();

    const operation: Promise<void> =
    (!this.data)
      ? this.cadasService.createCadas(this.cadas)
      .then(() =>
        this.cadasService.openSnackBar(`Pronto Cadastro ${this.cadas.nome} Criado!`, 'ADICIONADO'))
      .catch(() =>
        this.cadasService.openSnackBar(`Erro ao Cadastrar ${this.cadas.nome}`, 'CANCELADO'))

      : this.cadasService.updateCadas(this.cadas)
      .then(() =>
        this.cadasService.openSnackBar(`Pronto Cadastro ${this.cadas.nome} Atualizado!`, 'ATUALIZADO'))
      .catch(() =>
        this.cadasService.openSnackBar(`Erro ao Atualizar ${this.cadas.nome}`, 'CANCELADO'));

      operation.then(() => {
        this.dialogRef.close();
      });
  }
}

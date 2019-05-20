import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  CollectionReference
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Cadas } from '../interface/cadas.interface';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CadasService {

  cadasCollection: AngularFirestoreCollection<Cadas>;
  cadas$: Observable<Cadas[]>;

  constructor(
    private readonly afs: AngularFirestore,
    private snackBar: MatSnackBar
    ) {
    this.setCadas();
  }

  private setCadas(): void {
    this.cadasCollection = this.afs.collection<Cadas>('/cadas',
      (ref: CollectionReference) => ref
        .orderBy('nome', 'asc'));
  }

  async createCadas(cadas: Cadas): Promise<void> {
    const uid = this.afs.createId();
    const dtUpdate = Date.now();
    return this.cadasCollection.doc<Cadas>(uid)
      .set({
        uid,
        dtUpdate,
        nome: cadas.nome.toUpperCase(),
        dtNascimento: cadas.dtNascimento,
        numCaixa: cadas.numCaixa,
        ordem: cadas.ordem,
        observacao: cadas.observacao
      })
      .catch(error => this.handleError(error));
  }

  async updateCadas(cadas: Cadas): Promise<void> {
    await this.cadasCollection.doc<Cadas>(cadas.uid)
      .update(cadas)
      .catch(error => this.handleError(error));
  }

  async deleteCadas(cadas: Cadas): Promise<void> {
    await this.cadasCollection.doc<Cadas>(cadas.uid)
      .delete()
      .catch(error => this.handleError(error));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  private handleError(error: any) {
    console.log(error);
  }
}

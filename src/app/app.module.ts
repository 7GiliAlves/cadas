import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreSettingsToken } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatSnackBarModule,
} from '@angular/material';
import {NgxMaskModule} from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';

import { environment } from 'src/environments/environment';
import { CadasComponent } from './pages/cadas/cadas.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CadasListComponent } from './pages/cadas/cadas-list/cadas-list.component';
import { CadasItemComponent } from './pages/cadas/cadas-item/cadas-item.component';
import { CadasDialogComponent } from './pages/cadas/cadas-dialog/cadas-dialog.component';
import { AuthGuard } from './components/guard/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { CadasConfirmComponent } from './pages/cadas/cadas-confirm/cadas-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    CadasComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    CadasListComponent,
    CadasItemComponent,
    CadasDialogComponent,
    Error404Component,
    CadasConfirmComponent,
  ],
  entryComponents: [
    CadasDialogComponent,
    CadasConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    NgxMaskModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
    MatProgressBarModule,
    ScrollingModule,
    FlexLayoutModule,
    LayoutModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    AuthGuard,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

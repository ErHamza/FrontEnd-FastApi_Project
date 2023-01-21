import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notes/notes.component';
import { MynotesComponent } from './notes/mynotes/mynotes.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomePipe } from './welcome.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeximateModule } from 'ngx-teximate';
import { MeComponent } from './notes/me/me.component';
import { FixedComponent } from './directives/fixed.directive';
import { DeletedComponent } from './notes/deleted/deleted.component';
import { Intercepter } from './services/intercepter.service';
import { Moment } from 'moment';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesComponent,
    MynotesComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    CreateNoteComponent,
    WelcomePipe,
    MeComponent,
    FixedComponent,
    DeletedComponent
    
    
  ],
  imports: [
    BrowserModule,
    TeximateModule,
    BrowserAnimationsModule,
    
    FormsModule,
    RoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    
    
    
    
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:Intercepter, multi:true}],
  
  bootstrap: [AppComponent]
})
export class AppModule {

 }

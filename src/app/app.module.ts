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
import {  HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



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
    CreateNoteComponent
    
  ],
  imports: [
    BrowserModule,
    
    FormsModule,
    RoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    
    
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }



import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CreateNoteComponent } from "./create-note/create-note.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import {NotesGuard} from "./shared/Notes.guard";

import { MynotesComponent } from "./notes/mynotes/mynotes.component";
import { NotesComponent } from "./notes/notes.component";
import { Auth } from "./shared/perm.guard";
import { SignupComponent } from "./signup/signup.component";




const appRoutes :Routes=[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home' ,component:HomeComponent},
    {path:'addnote', component:CreateNoteComponent , canActivate:[NotesGuard]},
    {path:'login', component:LoginComponent , canActivate:[Auth]},
    {path:'signup', component:SignupComponent ,  canActivate:[Auth]},
    {path:'notes', component:NotesComponent, children:
[
    
    {path:'mynotes', component:MynotesComponent}

]
},

{path:'about', component:AboutComponent},
{path:'**', redirectTo:'home'}

]
@NgModule({

    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
    })
    export class RoutingModule{
    
    
    }


import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CreateNoteComponent } from "./create-note/create-note.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

import { MynotesComponent } from "./notes/mynotes/mynotes.component";
import { NotesComponent } from "./notes/notes.component";
import { SignupComponent } from "./signup/signup.component";




const appRoutes :Routes=[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home' ,component:HomeComponent},
    {path:'addnote', component:CreateNoteComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
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
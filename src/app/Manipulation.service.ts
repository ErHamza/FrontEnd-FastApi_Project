import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./Auth.service";
import { Notes } from "./Notes.model";

@Injectable({
    providedIn:'root'
})
export class ManipulationService{
  


    constructor(private http : HttpClient ,
        private auth:AuthService){};
    server:string="https://memos-app.herokuapp.com";
ShowNotes(){
    // return this.http.get<Notes>(
    //     this.server +"/posts"
        
    // )
    
    return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
        
        const token = user?.token;
       
        return  this.http.get<Notes[]|[]>(this.server+'/posts',{
            headers: new HttpHeaders({
              'Authorization' : 'Bearer '+token
            })
          })    
       
    }
 )    )
}
    
CreateNote(values:{name:string; content:string}){
    return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
        
        const token = user?.token;
       
        return    this.http.post(this.server+'/posts',values,{
            headers: new HttpHeaders({
              'Authorization' : 'Bearer '+token
            })
          })    
       
    }
 )    )


}


DeletPost(id:number){
    return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
        
        const token = user?.token;
       
        return    this.http.delete(this.server+'/posts/'+id,{
            headers: new HttpHeaders({
              'Authorization' : 'Bearer '+token
            })
          })    
       
    }
 )    )


}



UpdatePost(values:{name:string; content:string} , id :number){
  return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
      
      const token = user?.token;
     
      return    this.http.put(this.server+'/posts'+'/'+id, values,{
          headers: new HttpHeaders({
            'Authorization' : 'Bearer '+token
          })
        })    
     
  }
)    )


}

}
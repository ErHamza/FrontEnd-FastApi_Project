import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { exhaustAll, exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./Auth.service";
import { Notes } from "../models/Notes.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { DeletedNotes } from "../models/deleted.model";

@Injectable({
    providedIn:'root'
})
export class ManipulationService{
MyMemos?=new Subject<Notes[] | [] | undefined >;
isLight = new BehaviorSubject<Boolean>(true);




constructor(private http : HttpClient ,
        private auth:AuthService){};
server:string="http://127.0.0.1:8000";
ShowNotes(){

    
    return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
        
        const token = user?.token;
       
        return  this.http.get<Notes[] | [] >(this.server+'/posts')
    //     .pipe(map(
    // (data:Notes[]| [])=>{
    //   data.map((note : Notes | undefined) =>{
    //     if (note){
    //       const toDate = new Date(note.created_at);
    //     note.created_at = toDate;

    //     }
        
    //   })
      

      
    // }
    //     )) 
       
    }
 )    )
}
    
CreateNote(values:{name:string; content:string, published:Boolean}){
    return this.auth.UserData.pipe(take(1), exhaustMap(
      user=>{
        
        const token = user?.token;
       
        return    this.http.post(this.server+'/posts',values
            
            
            
          )    
       
    }
 )    )


}


// DeletPost(id:number){
//     return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
        
//         const token = user?.token;
       
//         return    this.http.put(this.server+'/posts/totrash/'+id,{

//             headers: new HttpHeaders({
//               'Authorization' : 'Bearer '+token

//             })
//           })    
       
//     }
//  )    )


// }

send_to_trash(id :number){
  return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
      
      const token = user?.token;
      console.log(token)
     
      return    this.http.put(this.server+'/posts/totrash/'+id, {
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
     
      return    this.http.put(this.server+'/posts/'+id, values,{
          headers: new HttpHeaders({
            'Authorization' : 'Bearer '+token
          })
        })    
     
  }
)    )


}


trash(){
  return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
      
      const token = user?.token;
     
      return    this.http.get<DeletedNotes[]>(this.server+'/trash',{
          headers: new HttpHeaders({
            'Authorization' : 'Bearer '+token
          })
        })    
     
  }
)    )


}

untrash(id: number){
return this.http.get(this.server+'/untrash/'+id)

}


// like(values:{post_id :number , dir: number}){
//   return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
//     const token = user?.token;
//     return this.http.post(this.server +'/vote' ,values,{
//       headers : new HttpHeaders({
//         'Authorization' : 'Bearer '+token

//       })
//     })
//   }))

// }

// getLikes(post_id: number){
//   return this.http.get<number>(this.server +post_id)
// }


}
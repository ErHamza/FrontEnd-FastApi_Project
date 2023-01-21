import { Component,
   OnInit,
   Input} from '@angular/core';
import { DeletedNotes } from 'src/app/models/deleted.model';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { ManipulationService } from 'src/app/services/Manipulation.service';
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Moment } from 'moment';
import * as moment from 'moment';


@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit {
  faExclamation= faExclamation;
  faTrashRestore=faTrashRestore;
  faTrashCan= faTrashCan;

  // @Input() deletedList?: DeletedNotes[];
  deletedList?: DeletedNotes[];

  constructor(private manipulate : ManipulationService) { }
  P(S :string  )

  {
    console.log("ddddd",S)
    
  
    
    return new Date(S);
    
    
  }

  ngOnInit(): void {
    this.getDeletedPost()
  }

  getDeletedPost(){
    this.manipulate.trash().subscribe(
      data=>{
        this.deletedList= data;
      }
    )
  }

  restore(id : number){
    this.deletedList= this.deletedList?.filter(post=>{
      return post.post_id!= id
    }
    
    )
    this.manipulate.untrash(id).subscribe();
  }

  

}

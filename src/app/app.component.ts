import { Component, OnInit } from '@angular/core';
import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Nombre'
      },
      birth: {
        title: 'Fecha'
      },
    }
  };

  data:any;
  constructor(private personsService:PersonService){}
  object:any;
 ngOnInit(){
  this.personsService.getPersons().subscribe(res=>{
    console.log("productos:",res);
    this.data=res;
  })
 }
 onDeleteConfirm(event:any): void {
  if (window.confirm('¿Estás seguro de querer eliminar a esta persona?')) {
    event.confirm.resolve();
    let index = this.data.indexOf(event.data);
    var selectedrow= this.data[index];
    this.personsService.deletePerson(selectedrow.idPerson)
    .subscribe(
      res=>{
        console.log(res);
      },
      err=>console.error(err)
    )
  } else {
    event.confirm.reject();
  }
}

onCreateConfirm(event:any):void { 
  if (window.confirm('¿Estás seguro de querer agregar una nueva persona?')) {
    event.confirm.resolve(event.newData);
     var newregistry = event.newData;
     console.log(newregistry);
    this.personsService.savePerson(newregistry)
  .subscribe(
    res => {
      this.ngOnInit();
      console.log(res);
    },
    err => console.error(err)
  )
  } else {
    event.confirm.reject();
  }
} 

onUpdateConfirm(event:any):void {
  if (window.confirm('¿Estás seguro de actualizar a esta persona?')) {
    event.confirm.resolve(event.newData);
    var newrow=event.newData;
    this.object= new Person;
    var id=newrow.idPerson;
    this.object.birth=newrow.birth;
    this.object.name=newrow.name;
    this.personsService.updatePerson(newrow.idPerson,this.object)
    .subscribe(
    res =>{
      console.log(event.newData,'LOGPUT');
      this.ngOnInit();
      console.log(res);
    },
    err => console.error(err)
  )
  } else {
    event.confirm.reject();
  }
}
}

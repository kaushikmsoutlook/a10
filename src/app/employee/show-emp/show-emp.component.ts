import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any=[];
  ModalTitle:string="Employee";
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  
  EmployeeIdFilter:string="";
  EmployeeNameFilter:string="";
  EmployeeListWithoutFilter:any=[];
  
    ngOnInit(): void {
      this.refreshEmpList();
    }
  
    addClick()
    {
      this.emp={
        EmployeeId:0,
        EmployeeName:"",
        Department: "",
        DateofJoining: "",
        PhotoFileName:"anomymous.png"
      }
      this.ModalTitle = "Add Employee";
      this.ActivateAddEditEmpComp =true;      
    }
  
  
    editClick(item:any)
    {
      this.emp = item;
      this.ModalTitle ="Edit Employee";
      this.ActivateAddEditEmpComp =true;
    }
  
    deleteClick(item:any){
      if(confirm('Are you sure??')){
        this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
          alert(data.toString());
          this.refreshEmpList();
        })
      }
    }
  
    CloseClick()
  {
    
    this.ActivateAddEditEmpComp =false;
    this.refreshEmpList();
  }
  
    refreshEmpList()
    {
      this.service.getEmpList().subscribe(data=>{
          this.EmployeeList = data;
      } );
    }
  }
  

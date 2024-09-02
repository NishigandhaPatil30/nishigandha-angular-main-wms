import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

id:any;
Id:any;
  constructor(private http:HttpClient, private router:Router) {}
  createclientmaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmsclientmasterentry.php',student);
         
  }
      getclientmaster(){
        return this.http.get<any[]>('https://www.swatpro.co/wmsclientmastershow.php');
      
  }
   editclientmaster(student:any){
        return this.http.put('https://www.swatpro.co/editclientmaster.php'+'?id=' + student.id,student);
  }
    getclientmasterById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getclientmasterid.php?id='+id);
  }
   deleteclientmaster(id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deleteclientmaster.php?id='+id);
      
  }
  
  createlocationmaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmslocationmasterentry.php',student);
         
  }

    getlocationmaster(){
        return this.http.get<any[]>('https://www.swatpro.co/wmslocationmastershow.php');
      
  }

 getlocationmasterById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getlocationmasterid.php?id='+id);
  }
 editlocationmaster(student:any){
        return this.http.put('https://www.swatpro.co/editlocationmaster.php'+'?id=' + student.id,student);
  }
 deletelocationmaster(id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deletelocationmaster.php?id='+id);
      
  }

 createwarehousemaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmswarehousemasterentry.php',student);      
 } 

   getwarehousemaster(){
        return this.http.get<any[]>('https://www.swatpro.co/wmswarehousemastershow.php');
      
  }
 getwarehousemasterById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getwarehousemasterid.php?id='+id);
  }
  editwarehousemaster(student:any){
        return this.http.put('https://www.swatpro.co/editwarehousemaster.php'+'?id=' + student.id,student);
  }

   deletewarehousemaster(id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deletewarehousemaster.php?id='+id);   
  }
  createusermaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmsusermasterentry.php',student);      
  } 
 getusermaster(){
        return this.http.get<any[]>('https://www.swatpro.co/wmsusermastershow.php');   
  }
getusermasterById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getusermasterid.php?id='+id);
  }
  getrootmasterById(Id:any){
      return this.http.get<any[]>('https://www.swatpro.co/getrootmasterid.php?Id='+Id);
}
   editusermaster(student:any){
        return this.http.put('https://www.swatpro.co/editusermaster.php'+'?Id=' + student.Id,student);
  }
  
   deleteroutemaster(Id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deleteroutemaster.php?Id='+Id);   
  }
  deleteroutemaster1(Id:any){
      return this.http.delete<any[]>('https://www.swatpro.co/deleteroutemaster1.php?Id='+Id);   
}
  createproductmaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmsproductmasterentry.php',student);      
  }
getproductmaster(){
        return this.http.get<any[]>('https://www.swatpro.co/wmsproductmastershow.php');   
  }
getproductmasterById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getproductmasterid.php?id='+id);
  }
   editproductmaster(student:any){
        return this.http.put('https://www.swatpro.co/editproductmaster.php'+'?Id=' + student.Id,student);
  }
 deleteprodcutmaster(Id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deleterproductmaster.php?Id='+Id);   
  }
  creategridmaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmsgridmasterentry.php',student);      
  }
 
    getgridmaster(){
        return this.http.get<any[]>('https://www.swatpro.co/wmsgridmastershow.php');   
  }
  
  getgridmasterById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getgridmasterid.php?id='+id);
  }
    editgridmaster(student:any){
        return this.http.put('https://www.swatpro.co/editgridmaster.php'+'?Id=' + student.Id,student);
  }
  deletegridmaster(Id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deletegridmaster.php?Id='+Id);   
  }
  createorigincreation(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmsorigincreationentry.php',student);      
  }
  getorigincreation(){
        return this.http.get<any[]>('https://www.swatpro.co/wmsorigincreationshow.php');
      
  }
  getorigincreationById(id:any){
        return this.http.get<any[]>('https://www.swatpro.co/getoriginacreationid.php?id='+id);
  }
   editorigincreation(student:any){
        return this.http.put('https://www.swatpro.co/editorigincreationmaster.php'+'?id=' + student.id,student);
  }

  deleteorigincreation(id:any){
        return this.http.delete<any[]>('https://www.swatpro.co/deleteorigincreation.php?id='+id);   
  }

   creatroutemaster(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/wmsroutemasterenrty.php',student);      
  }
   createStudent(student:any){
        return this.http.post<any[]>('https://www.swatpro.co/insert.php',student);
      
  }

gridmasterexcelasheet(csvFile:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile);
return this.http.post<any>('https://www.swatpro.co/gridmasterexcelsheetdepowise.php',formData);
}

clientmasterexcelasheet(csvFile1:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/clientmasterexcelsheetdepowise.php',formData);
}

locationmasterexcelasheet(csvFile1:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/locationexcelsheet.php',formData);
}

warehousemasterexcelasheet(csvFile1:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/warehouseexcelsheetdepowise.php',formData);
}
usermasterexcelasheet(csvFile1:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/usermasterexcelsheet.php',formData);
}

productmasterexcelasheet(csvFile1:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/productmasterexcelsheetdepowise.php',formData);
}

routemasterexcelasheet(csvFile1:File):Observable<any>{
var formData: any = new FormData();
formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/routemasterexcelsheetdepowise.php',formData);
}

inwardmasterexcel(csvFile1:File):Observable<any>{
var formData: any = new FormData();

formData.append("fileToUpload",csvFile1);

return this.http.post<any>('https://www.swatpro.co/inwardmasterexcelsheetwarehousedepowise.php',formData);

}
outwardmasterexcel(csvFile1: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append("fileToUpload", csvFile1);
    
      return this.http.post<any>('https://www.swatpro.co/outwardmasterexcelsheet.php', formData)
        .pipe(
          tap(
            (data: any) => {
              console.log('Success Response:', data);
            },
            (error) => {
              console.error('Error Response:', error);
            }
          )
        );
    }
    
hseequpementmasterexcelasheet(csvFile1:File):Observable<any>{
      var formData: any = new FormData();
      formData.append("fileToUpload",csvFile1);
      return this.http.post<any>('https://www.swatpro.co/hsemasterexcelsheet.php',formData);
      }

leakagedamagemasterexcelasheet(csvFile1:File):Observable<any>{
            var formData: any = new FormData();
            formData.append("fileToUpload",csvFile1);
            return this.http.post<any>('https://www.swatpro.co/leakagemasterexcelsheet.php',formData);
            }
compatibilitymasterexcelasheet(csvFile1:File):Observable<any>{
      
                  var formData: any = new FormData();
                  formData.append("fileToUpload",csvFile1);
return this.http.post<any>('https://www.swatpro.co/compatibilitygridmasterexcelsheet.php',formData);
                  }
}














  

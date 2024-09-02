import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

@Injectable({
providedIn: 'root'
})

export class ApiService {
redirectUrl: any;
username:any;
baseUrl:string = "https://www.swatpro.co/logintest.php";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
constructor(private httpClient : HttpClient) { }
public userlogin(Name:any, Password:any) {
//alert(email)
return this.httpClient.post<any>('https://www.swatpro.co/logintest.php',{Name, Password})
.pipe(map(Users => {
this.setToken(Users[0].Name);
this.getLoggedInName.emit(true);
return Users;
}));
}

public userregistration(Name:any,Password:any) {

return this.httpClient.post<any>('https://www.swatpro.co/register.php',{ Name,Password})
.pipe(map(Users => {
return Users;
}));
}

//token
setToken(token: string) {
localStorage.setItem('token', token);
}
getToken() {
return localStorage.getItem('token');
}
deleteToken() {
localStorage.removeItem('token');
}
isLoggedIn() {
const usertoken = this.getToken();
if (usertoken != null) {
return true
}
return false;
}
}
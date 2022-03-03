import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames=['Chris','Anna']
ngOnInit(){

  this.signupForm= new FormGroup({
    'user-data': new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),        //argumendid: default value,validators
      'email': new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails)    //kolmas arg on async validaator
    }),
    
    'gender': new FormControl('male'),
    'hobbies': new FormArray([])
  });

  this.signupForm.statusChanges.subscribe((status: any) => {console.log(status);})   // status muutumist j2lgida observable abil, valuechange saab ka 

  this.signupForm.setValue({              // systime default valued formi ,patchValuega saab yksikult muuta
    'user-data':{
      'username':'Mart',
      'email':'mart@mail.ee'
    },
    'gender':'male',
    'hobbies':[]
  })

}
onSubmit(){
  console.log(this.signupForm)
  this.signupForm.reset();     // kui soovin resettida teatud lahtrid siis t2psustada reseti sees objektiga
}
onAddHobby(){
  const control= new FormControl(null,Validators.required);
  (<FormArray>this.signupForm.get('hobbies')).push(control)
}
getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
}
forbiddenNames(control: FormControl):{[s: string]:boolean}{     // custom validaator
  if(this.forbiddenUserNames.indexOf(control.value) != -1){
    return {'forbidden' : true};
  }else{
    return null;
  }
}
forbiddenEmails(control: FormControl): Promise<any> | Observable<any> { //async validaator
    const promise= new Promise<any>((resolve, reject) =>{
      setTimeout(() =>{
        if(control.value=== 'test@test.com'){
          resolve({'emailIsForbidden':true})
        }else{
          resolve(null)
        }
      },1500)
    });
    return promise;
}

  



}



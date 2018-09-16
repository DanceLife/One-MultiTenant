import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';


@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  configForm: FormGroup;
  configObject: any;
  scriptBlockInformationError: string;
  firebaseConfigKeys = ['apiKey','authDomain','databaseURL','projectId','storageBucket','messagingSenderId'];
 
  testObject = {test:'test',test2:'test2'};

  constructor(private appService: AppService) { }

  ngOnInit() {  
    this.appService.configObjectSubject.subscribe(
      (config)=>{this.configObject = config}
    )
    this.configForm = new FormGroup({
      configInputBox: new FormControl(null)
    });
    this.appService.initializeApp();
  }

  saveAndInitialize(){
    const scriptBlock = this.configForm.controls['configInputBox'].value.replace(/<script>/g, "X->").replace(/<\/script>/g, "<-X");
      if(scriptBlock){
        this.configObject = this.scriptBlockToObject(scriptBlock) == null ? this.configObject : this.scriptBlockToObject(scriptBlock);
        }else{
        this.scriptBlockInformationError = "No configuration provided";
      }
      if(!this.scriptBlockInformationError){
        const configObjectStringified = JSON.stringify(this.configObject);
        localStorage.setItem("firebaseConfiguration",configObjectStringified);
        this.appService.initializeApp();
      }
  }

  clearFirebaseConfiguration(){
    localStorage.removeItem("firebaseConfiguration");
    this.configObject = null;
  }

  scriptBlockToObject(scriptBlock){
    let configObject = {};
    this.scriptBlockInformationError = null;
    for( let i = 0; i < this.firebaseConfigKeys.length; i++ ){
      const key2Extract = this.firebaseConfigKeys[i];
      const keyPosition = scriptBlock.indexOf(key2Extract);
      if(keyPosition < 0){
        this.scriptBlockInformationError = "At least a key was missing from the configuration: " + key2Extract;
        configObject = {};
        return null;
      }
      const keyValueDirty = scriptBlock.substring(keyPosition  + key2Extract.length + 1).trim().replace('"','');
      const keyValue = keyValueDirty.substring(0,keyValueDirty.indexOf('"'));
      configObject[key2Extract] = keyValue;
    }
    console.log("configObject: ",configObject);
    return configObject;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-firebaseconfig',
  templateUrl: './firebaseconfig.component.html',
  styleUrls: ['./firebaseconfig.component.scss']
})
export class FirebaseConfigComponent implements OnInit {
  configForm: FormGroup;
  configObject: any;
  scriptBlockInformationError: string;
  firebaseConfigKeys = ['apiKey','authDomain','databaseURL','projectId','storageBucket','messagingSenderId'];

  testObject = {test:'test',test2:'test2'};

  constructor(private dataService: DataService) { }

  ngOnInit() {  
    this.dataService.configObjectSubject.subscribe(
      (config)=>{this.configObject = config}
    )
    this.configForm = new FormGroup({
      configInputBox: new FormControl(null)
    });
    this.dataService.initializeApp();
  }

  clearfirebaseInternalConfiguration(){
    localStorage.removeItem("firebaseConfiguration");
    this.configObject = null;
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
        this.dataService.initializeApp();
      }
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

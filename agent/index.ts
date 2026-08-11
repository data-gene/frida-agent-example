/// <reference types="frida-gum" />
import Java from "frida-java-bridge";
import ObjC from "frida-objc-bridge";
import { DeviceInterfaced } from "./DeviceInterfaced/DeviceInterfaced.js";

import { log } from "./logger.js";
import { ItunesRestore } from "./iTunesRestore/ItunesRestore.js";

if(ObjC.available && Process.platform === "darwin"){
    log(`darwin and Objective-C runtime is available!`);
    
    DeviceInterfaced();

}else if(Process.platform === "windows"){
    log(`Windows Agent loaded successfully!`);
    
    ItunesRestore();
    
}else if(Java.available){
    log(`Java runtime is available!`);
}else{
    log(`Unknown platform!`);
}
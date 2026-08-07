/// <reference types="frida-gum" />
import Java from "frida-java-bridge";
import { log } from "./logger.js";
import ObjC from "frida-objc-bridge";
import { KISInterfaceDebugUSBClass } from "./KISInterfaceDebugUSB.js";
import { DockChannelInterfaceKISPAMClass } from "./DockChannelInterfaceKISPAM.js";
import { DeviceInterfaceCommon } from "./DeviceInterface.js";
import { MobileDevice } from "./MobileDevice.js";

if(ObjC.available && Process.platform === "darwin"){
    log(`darwin and Objective-C runtime is available!`);
    
    DeviceInterfaceCommon(); 
    KISInterfaceDebugUSBClass();
    DockChannelInterfaceKISPAMClass();

}else if(Process.platform === "windows"){
    log(`Windows Agent loaded successfully!`);

    MobileDevice();
    
/*
    let idx = 0;
    Interceptor.attach(Module.getGlobalExportByName("ios_get_screenshotr"), {
        onEnter(args) {
            this.arg0 = args[0];
            this.arg1 = args[1];
            this.arg2 = args[2];
            log(`--->ios_get_screenshotr enter: ${args[0]},${args[1]}}}`);
        },
        onLeave(retval) {
            //File.writeAllBytes(`screenshot${idx++}.bin`, retval.readPointer());
            log(`--->ios_get_screenshotr returned:`);
            let nSize = retval.add(8).readU64().toNumber();
            log(`--->${nSize} bytes`);
            log(`${hexdump(retval.readPointer(),{length: 48})}`);
        }  
    });
*/
    //appleUsbFilter.dll
    /**
     * 
     * 
        BOOL __stdcall
        WinUsb_WritePipe(
        _In_  WINUSB_INTERFACE_HANDLE InterfaceHandle,
        _In_  UCHAR PipeID,
        _In_reads_bytes_(BufferLength) PUCHAR Buffer,
        _In_  ULONG BufferLength,
        _Out_opt_ PULONG LengthTransferred,
        _In_opt_ LPOVERLAPPED Overlapped
        );
     */
    // Interceptor.attach(Module.getGlobalExportByName("WinUsb_WritePipe"), {
    //     onEnter(args) 
    //     {
    //         log(`--->WinUsb_WritePipe(pipeID:${args[1]},BufferLength:${args[3].toInt32()})`);
    //         log(`${hexdump(args[2].readPointer(),{length: args[3].toInt32()})}`);
    //     },
    //     onLeave(retval) {}  
    // });

}else if(Java.available){
    log(`Java runtime is available!`);
}else{
    log(`Unknown platform!`);
}
import { log, printCallStack } from "../logger.js";
import ObjC from "frida-objc-bridge";

export function KISInterfaceDebugUSBClass():void
{
    var idx = 0;
    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- handleDataForInterfaceFromEndpoint:result:data:length:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB handleDataForInterfaceFromEndpoint:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                //printCallStack(this.context);
                //this.inputBuffer = args[4];
                //this.inputSize = args[5].toInt32();
                //this.inputBuffer = bytesPtr.readByteArray(length);
                //log(typeof(bytesPtr));
                //var filePath = '/Users/dev/Documents/hook/log/'+(++idx)+'.bin'
                //File.writeAllBytes(filePath,this.input);
                //log(hexdump(this.inputBuffer,{length:this.inputSize}));  
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- handleAsyncCommandCompletion:fromEndpoint:buffer:bytesTransferred:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB handleAsyncCommandCompletion:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    
    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- sendCommand:length:andReadResponse:responseLength:endpoint:commandResult:responseResult:timeout:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB sendCommand:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    /*
    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- readRegistersFromIndex:count:sequenceID:endpointAddress:portal:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB readRegistersFromIndex:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- writeRegistersFromIndex:count:registers:sequenceID:endpointAddress:portal:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB writeRegistersFromIndex:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- readMemoryFromAddress:length:sequenceID:endpointAddress:portal:payloadWriteFlags:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB readMemoryFromAddress:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- writeMemoryFromAddress:length:data:sequenceID:endpointAddress:portal:payloadWriteFlags:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB writeMemoryFromAddress:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    */
    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- sendCommandAsync:length:endpoint:timeout:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB sendCommandAsync:${args[0]},${args[1]},${args[2]},${args[3]},${args[4]},${args[5]}]`);
                log(`--->lenght:${args[3].toInt32()}\n${hexdump(args[2], {length: args[3].toInt32()})}`);
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        ObjC.classes.KISInterfaceDebugUSB['- processComponentInfo:data:length:'].implementation,
        {
            onEnter:function(args){
                log(`-[KISInterfaceDebugUSB processComponentInfo:${args[0]},${args[1]},${args[2]}]`);
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
}

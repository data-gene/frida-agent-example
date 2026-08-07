import { log, printCallStack } from "./logger";

export function MobileDevice():void
{

    //device,options,cbProgress,userInfo
    Interceptor.attach(Module.getGlobalExportByName("AMRestorePerformRecoveryModeRestore"), {
        onEnter(args) {log(`--->AMRestorePerformRecoveryModeRestore`);},
        onLeave(retval) {}
    });

    Interceptor.attach(Module.getGlobalExportByName("AMRestorePerformRecoveryModeRestore"), {
        onEnter(args) {log(`--->AMRestorePerformRecoveryModeRestore`);},
        onLeave(retval) {}
    });

    Interceptor.attach(Module.getGlobalExportByName("DeviceIoControl"), {
        onEnter(args) {log(`--->DeviceIoControl(h=${args[0]}, code=${args[1]}, inBuf=${args[2]}, inBufSize=${args[3]}, outBuf=${args[4]}, outBufSize=${args[5]})`);},
        onLeave(retval) {}
    });

    Interceptor.attach(Module.getGlobalExportByName("CreateFileA"), {
        onEnter(args) {log(`--->CreateFileA(lpFileName=${args[0]}, dwDesiredAccess=${args[1]}, dwShareMode=${args[2]}, lpSecurityAttributes=${args[3]}, dwCreationDisposition=${args[4]}, dwFlagsAndAttributes=${args[5]}, hTemplateFile=${args[6]})`);},
        onLeave(retval) {}
    });    

    Interceptor.attach(Module.getGlobalExportByName("CreateFileW"), {
        onEnter(args) {log(`--->CreateFileW(lpFileName=${args[0]}, dwDesiredAccess=${args[1]}, dwShareMode=${args[2]}, lpSecurityAttributes=${args[3]}, dwCreationDisposition=${args[4]}, dwFlagsAndAttributes=${args[5]}, hTemplateFile=${args[6]})`);},
        onLeave(retval) {}
    });      
}
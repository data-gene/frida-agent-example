import { log, printCallStack } from "./logger";

export function MobileDevice():void
{
    const kCFStringEncodingUTF8 = 0x08000100;

    const MobileDeviceBase = Process.getModuleByName("MobileDevice.dll").base;
    const CFStringGetCStringPtr = new NativeFunction(Module.getGlobalExportByName('CFStringGetCStringPtr'),'pointer', ['pointer', 'uint32']);
    const CFShow = new NativeFunction(Module.getGlobalExportByName('CFShow'),'pointer', ['pointer']);
    // const AMRUSBInterfaceReadPipe = MobileDeviceBase.add(0x231CD0);
    // Interceptor.attach(AMRUSBInterfaceReadPipe, {
    //     onEnter(args) {
    //         log(`--->AMRUSBInterfaceReadPipe(h=${args[0]}, code=${args[1]}, buffer=${args[2]}, bufferSize=${args[3]}`);
    //         printCallStack(this.context);
    //     },
    //     onLeave(retval) {}
    // });

    const AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice = MobileDeviceBase.add(0x214D00);
    Interceptor.attach(AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice, {
        onEnter(args) {
            //CFShow(args[1]);
            var ptrcstr = CFStringGetCStringPtr(args[1], kCFStringEncodingUTF8);
            log(`--->AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice(device=${args[0]}, envkey=${ptrcstr.readUtf8String()})`);
            //printCallStack(this.context);
        },
        onLeave(retval) {}
    });

    //device,options,cbProgress,userInfo
    Interceptor.attach(Module.getGlobalExportByName("AMRestorePerformRecoveryModeRestore"), {
        onEnter(args) {
            log(`--->AMRestorePerformRecoveryModeRestore`);
            //printCallStack(this.context);
        },
        onLeave(retval) {}
    });

    Interceptor.attach(Module.getGlobalExportByName("DeviceIoControl"), {
        onEnter(args) {
            if(args[1].toInt32() !== 0x2201b6) {
                log(`--->DeviceIoControl(h=${args[0]}, code=${args[1]}, inBuf=${args[2]}, inBufSize=${args[3]}, outBuf=${args[4]}, outBufSize=${args[5]})`);
            }
        },
        onLeave(retval) {}
    });

    Interceptor.attach(Module.getGlobalExportByName("CreateFileA"), {
        onEnter(args) {log(`--->CreateFileA(lpFileName=${args[0].readUtf8String()})`);},
        onLeave(retval) {log(`--->CreateFileA returned: ${retval}`);}
    });    

    Interceptor.attach(Module.getGlobalExportByName("CreateFileW"), {
        onEnter(args) {log(`--->CreateFileW(lpFileName=${args[0].readUtf16String()})`);},
        onLeave(retval) {log(`--->CreateFileW returned: ${retval}`);}
    });      
}
import { kPrintSize,log, printCallStack } from "../logger";

export function MobileDevice():void
{
    const kCFStringEncodingASCII = 0x0600;
    const kCFStringEncodingUTF8 = 0x08000100;

    const MobileDeviceBase = Process.getModuleByName("MobileDevice.dll").base;
    const CFStringGetCStringPtr = new NativeFunction(Module.getGlobalExportByName('CFStringGetCStringPtr'),'pointer', ['pointer', 'uint32']);
    const CFStringGetCString = new NativeFunction(Module.getGlobalExportByName('CFStringGetCString'),'int', ['pointer', 'pointer', 'int', 'uint32']);    
    const CFStringGetLength = new NativeFunction(Module.getGlobalExportByName('CFStringGetLength'),'int', ['pointer']);
    const CFShow = new NativeFunction(Module.getGlobalExportByName('CFShow'),'pointer', ['pointer']);

    function cfStringToUtf8(cfString: NativePointer): string | null {
        if (cfString.isNull()) return null;
        var length = CFStringGetLength(cfString);
        // 每个字符最多 4 字节 UTF-8 + 终止符
        var bufferSize = length * 4 + 1;
        var buffer = Memory.alloc(bufferSize);
        var success = CFStringGetCString(cfString, buffer, bufferSize, kCFStringEncodingUTF8);
        if (success) {
            return buffer.readUtf8String();
        }
            
        return null;
    }

    // USB operations
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
            log(`--->AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice(device=${args[0]}, envkey=${cfStringToUtf8(args[1])})`);
        },
        onLeave(retval) {}
    });

    //device,options,cbProgress,userInfo
    Interceptor.attach(Module.getGlobalExportByName("AMRestorePerformRecoveryModeRestore"), {
        onEnter(args) {
            log(`--->AMRestorePerformRecoveryModeRestore`);
        },
        onLeave(retval) {}
    });
   
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionSend"), {
        onEnter(args) {
            log(`--->AMDServiceConnectionSend(con=${args[0]}, data=${args[1]}),size=${args[2]}`);
            var size = args[2].toInt32()>kPrintSize ? kPrintSize : args[2].toInt32();
            log(`\n${hexdump(args[1], {length: size})}`);
        },
        onLeave(retval) {log(`--->AMDServiceConnectionSend returned: ${retval}`);}
    });
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionSendMessage"), {
        onEnter(args) {
            log(`--->AMDServiceConnectionSendMessage(con=${args[0]}, plist=${args[1]}),format=${args[2]}`);
            var size = args[2].toInt32()>kPrintSize ? kPrintSize : args[2].toInt32();
            log(`\n${hexdump(args[1], {length: size})}`);
        },
        onLeave(retval) {log(`--->AMDServiceConnectionSendMessage returned: ${retval}`);}
    });
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionReceive"), {
        onEnter(args) {
            log(`--->AMDServiceConnectionReceive(con=${args[0]}, data=${args[1]}),size=${args[2]}`);
            this.conn = args[0];
            this.data = args[1];
            this.size = args[2];
        },
        onLeave(retval) {
            log(`--->AMDServiceConnectionReceive returned: ${retval}`);
            var size = this.size.toInt32()>kPrintSize ? kPrintSize : this.size.toInt32();
            log(`\n${hexdump(this.data, {length: size})}`);
        }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionReceiveMessage"), {
        onEnter(args) {
            log(`--->AMDServiceConnectionReceiveMessage(con=${args[0]}, plist=${args[1]}),format=${args[2]}`);
            this.conn = args[0];
            this.data = args[1];
            this.size = args[2];
        },
        onLeave(retval) {
            log(`--->AMDServiceConnectionReceiveMessage returned: ${retval}`);
            var size = this.size.toInt32()>kPrintSize ? kPrintSize : this.size.toInt32();
            log(`\n${hexdump(this.data, {length: size})}`);
        }
    });

    //service
    Interceptor.attach(Module.getGlobalExportByName("AMDeviceSecureStartService"), {
        onEnter(args) {
            log(`--->AMDeviceSecureStartService(device=${args[0]}, service=${cfStringToUtf8(args[1])})`);
        },
        onLeave(retval) {}
    });

    //RPSocket
    Interceptor.attach(Module.getGlobalExportByName("RPSocksServerCreateWithAddress"), {
        onEnter(args) {log(`--->RPSocksServerCreateWithAddress(sockaddr=${args[0]})`);},
        onLeave(retval) {}
    });
    Interceptor.attach(Module.getGlobalExportByName("RPSocksProxyCreateConnectionWithSocket"), {
        onEnter(args) {log(`--->RPSocksProxyCreateConnectionWithSocket(sockaddr=${args[0]})`);},
        onLeave(retval) {}
    });
    Interceptor.attach(Module.getGlobalExportByName("RPSocksProxyStart"), {
        onEnter(args) {log(`--->RPSocksProxyStart(sockaddr=${args[0]})`);},
        onLeave(retval) {}
    });
}
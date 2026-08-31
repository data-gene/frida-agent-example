import { kPrintSize, log, printCallStack } from "../logger";
import { CFTypeToUtf8, PrintCFDictionary } from "./CoreFoundationDll";


// MobileDevice.dll version=1818.13.1.1
export function MobileDevice(): void {
    const Tag = MobileDevice.name;
    const MobileDeviceBase = Process.getModuleByName("MobileDevice.dll").base;
    // private function
    const AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice = MobileDeviceBase.add(0x214D00);
    const restore_handle_data_request_msg = MobileDeviceBase.add(0x222F70);
    const restore_handle_async_data_request = MobileDeviceBase.add(0x220ED0);
    const cf_recv_send_command = MobileDeviceBase.add(0x215D10);
    const cf_setenv = MobileDeviceBase.add(0x216580);

    // USB operations
    // const AMRUSBInterfaceReadPipe = MobileDeviceBase.add(0x231CD0);
    // Interceptor.attach(AMRUSBInterfaceReadPipe, {
    //     onEnter(args) {
    //         log(`AMRUSBInterfaceReadPipe(h=${args[0]}, code=${args[1]}, buffer=${args[2]}, bufferSize=${args[3]}`);
    //         printCallStack(this.context);
    //     },
    //     onLeave(retval) {}
    // });

    //restored
    Interceptor.attach(restore_handle_data_request_msg, {
        onEnter(args) {
            log(`[${Tag}]: restore_handle_data_request_msg(msg=${args[0]}, unknow=${args[1]})`);
            let plist = args[0].add(8).readPointer();
            PrintCFDictionary(plist)
        },
        onLeave(retval) { }
    });
    
    Interceptor.attach(restore_handle_async_data_request, {
        onEnter(args) {
            log(`[${Tag}]: restore_handle_async_data_request(msg=${args[0]}, unknow=${args[1]})`);
            let plist = args[0].add(8).readPointer();
            PrintCFDictionary(plist)
        },
        onLeave(retval) { }
    });

    // recovery functions
    Interceptor.attach(cf_setenv, {
        onEnter(args) {
            log(`[${Tag}]: cf_setenv(inDict1=${CFTypeToUtf8(args[1])},\ninDict2=${CFTypeToUtf8(args[2])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(cf_recv_send_command, {
        onEnter(args) {
            log(`[${Tag}]: cf_recv_send_command(cmd=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });

    Interceptor.attach(AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice, {
        onEnter(args) {
            log(`[${Tag}]: AMRecoveryModeDeviceCopyEnvironmentVariableFromDevice(device=${args[0]}, var=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRestorableDeviceSendFile"), {
        onEnter(args) {
            log(`[${Tag}]: AMRestorableDeviceSendFile(device=${args[0]}, file=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRestorableDeviceSendCommand"), {
        onEnter(args) {
            log(`[${Tag}]: AMRestorableDeviceSendCommand(device=${args[0]}, command=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRestorableDeviceSendBlindCommand"), {
        onEnter(args) {
            log(`[${Tag}]: AMRestorableDeviceSendBlindCommand(device=${args[0]}, command=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRecoveryModeDeviceSendCommandToDevice"), {
        onEnter(args) {
            log(`[${Tag}]: AMRecoveryModeDeviceSendCommandToDevice(device=${args[0]}, command=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRecoveryModeDeviceSendBlindCommandToDevice"), {
        onEnter(args) {
            log(`[${Tag}]: AMRecoveryModeDeviceSendBlindCommandToDevice(device=${args[0]}, command=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRecoveryModeDeviceSendFileToDevice"), {
        onEnter(args) {
            log(`[${Tag}]: AMRecoveryModeDeviceSendFileToDevice(device=${args[0]}, file=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });

    //device,options,cbProgress,userInfo
    Interceptor.attach(Module.getGlobalExportByName("AMRestorePerformRecoveryModeRestore"), {
        onEnter(args) {
            log(`[${Tag}]: AMRestorePerformRecoveryModeRestore(inDict=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRestoreCreateDefaultOptions"), {
        onEnter(args) {
            log(`[${Tag}]: AMRestoreCreateDefaultOptions`);
        },
        onLeave(retval) {
            log(`[${Tag}]: AMRestoreCreateDefaultOptions returned: ${PrintCFDictionary(retval)}`);
        }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMRestorableDeviceCopyDefaultRestoreOptions"), {
        onEnter(args) {
            log(`[${Tag}]: AMRestorableDeviceCopyDefaultRestoreOptions`);
        },
        onLeave(retval) {
            log(`[${Tag}]: AMRestorableDeviceCopyDefaultRestoreOptions returned: ${PrintCFDictionary(retval)}`);
        }
    });
    //socket 
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionSend"), {
        onEnter(args) {
            log(`[${Tag}]: AMDServiceConnectionSend(con=${args[0]}, data=${args[1]}),size=${args[2]}`);
            var size = args[2].toInt32() > kPrintSize ? kPrintSize : args[2].toInt32();
            log(`\n${hexdump(args[1], { length: size })}`);
        },
        onLeave(retval) { log(`[${Tag}]: AMDServiceConnectionSend returned: ${retval}`); }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionSendMessage"), {
        onEnter(args) {
            log(`[${Tag}]: AMDServiceConnectionSendMessage(con=${args[0]}, plist=${args[1]}),format=${args[2]}`);
            var size = args[2].toInt32() > kPrintSize ? kPrintSize : args[2].toInt32();
            log(`\n${hexdump(args[1], { length: size })}`);
        },
        onLeave(retval) { log(`[${Tag}]: AMDServiceConnectionSendMessage returned: ${retval}`); }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionReceive"), {
        onEnter(args) {
            log(`[${Tag}]: AMDServiceConnectionReceive(con=${args[0]}, data=${args[1]}),size=${args[2]}`);
            this.conn = args[0];
            this.data = args[1];
            this.size = args[2];
        },
        onLeave(retval) {
            log(`[${Tag}]: AMDServiceConnectionReceive returned: ${retval}`);
            var size = this.size.toInt32() > kPrintSize ? kPrintSize : this.size.toInt32();
            log(`\n${hexdump(this.data, { length: size })}`);
        }
    });
    Interceptor.attach(Module.getGlobalExportByName("AMDServiceConnectionReceiveMessage"), {
        onEnter(args) {
            log(`[${Tag}]: AMDServiceConnectionReceiveMessage(con=${args[0]}, plist=${args[1]}),format=${args[2]}`);
            this.conn = args[0];
            this.data = args[1];
            this.size = args[2];
        },
        onLeave(retval) {
            log(`[${Tag}]: AMDServiceConnectionReceiveMessage returned: ${retval}`);
            var size = this.size.toInt32() > kPrintSize ? kPrintSize : this.size.toInt32();
            log(`\n${hexdump(this.data, { length: size })}`);
        }
    });

    //service
    Interceptor.attach(Module.getGlobalExportByName("AMDeviceSecureStartService"), {
        onEnter(args) {
            log(`[${Tag}]: AMDeviceSecureStartService(device=${args[0]}, service=${CFTypeToUtf8(args[1])})`);
        },
        onLeave(retval) { }
    });

    //RPSocket
    Interceptor.attach(Module.getGlobalExportByName("RPSocksServerCreateWithAddress"), {
        onEnter(args) { log(`[${Tag}]: RPSocksServerCreateWithAddress(sockaddr=${args[0]})`); },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("RPSocksProxyCreateConnectionWithSocket"), {
        onEnter(args) { log(`[${Tag}]: RPSocksProxyCreateConnectionWithSocket(sockaddr=${args[0]})`); },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("RPSocksProxyStart"), {
        onEnter(args) { log(`[${Tag}]: RPSocksProxyStart(sockaddr=${args[0]})`); },
        onLeave(retval) { }
    });
}
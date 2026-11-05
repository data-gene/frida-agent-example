import { kPrintSize, log } from "../logger";

const g_log_dir = 'D:/dump';
let g_send_idx = 0;
let g_filedata_count = 0;

export function libimobiledevice(): void {
    const Tag = libimobiledevice.name;
    const libimobiledeviceBase = Process.getModuleByName("libimobiledevice.dll").base;

    Interceptor.attach(Module.getGlobalExportByName("service_send"), {
        onEnter(args) {
            // const fullData = args[1].readByteArray(args[2].toInt32());
            // const nSize = args[2].toInt32() > kPrintSize ? kPrintSize : args[2].toInt32();
            // //log(`[${Tag}]: service_send(client=${args[0]}, data=${args[1]}),size=${args[2]})`);
            

            // if (fullData && args[2].toInt32() > 16 && args[2].toInt32() < 1024*1024) {
            //     //log(`[${Tag}]:${hexdump(args[1], { length: nSize })}`);
            //     //File.writeAllBytes(`${g_log_dir}/service_send${g_send_idx++}.plist`, fullData);
            // }
        },
        onLeave(retval) { }
    });

    Interceptor.attach(Module.getGlobalExportByName("service_send"), {
        onEnter(args) {
            // const fullData = args[1].readByteArray(args[2].toInt32());
            // const nSize = args[2].toInt32() > kPrintSize ? kPrintSize : args[2].toInt32();
            // //log(`[${Tag}]: service_send(client=${args[0]}, data=${args[1]}),size=${args[2]})`);
            

            // if (fullData && args[2].toInt32() > 16 && args[2].toInt32() < 1024*1024) {
            //     //log(`[${Tag}]:${hexdump(args[1], { length: nSize })}`);
            //     //File.writeAllBytes(`${g_log_dir}/service_send${g_send_idx++}.plist`, fullData);
            // }
        },
        onLeave(retval) { }
    });
}
import { log } from "../logger";

export function Kernel32():void
{
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

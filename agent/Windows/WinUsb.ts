import { kPrintSize,log } from "../logger";

export function WinUsb():void
{
    //appleUsbFilter.dll
    /**
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
    Interceptor.attach(Module.getGlobalExportByName("WinUsb_WritePipe"), {
        onEnter(args) 
        {
            log(`--->WinUsb_WritePipe(pipeID:${args[1]},BufferLength:${args[3].toInt32()})`);
            log(`${hexdump(args[2].readPointer(),{length: args[3].toInt32()})}`);
        },
        onLeave(retval) {}  
    });  
}
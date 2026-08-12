
const kCFStringEncodingASCII = 0x0600;
const kCFStringEncodingUTF8 = 0x08000100;

const CFStringGetCStringPtr = new NativeFunction(Module.getGlobalExportByName('CFStringGetCStringPtr'),'pointer', ['pointer', 'uint32']);
const CFStringGetCString = new NativeFunction(Module.getGlobalExportByName('CFStringGetCString'),'int', ['pointer', 'pointer', 'int', 'uint32']);    
const CFStringGetLength = new NativeFunction(Module.getGlobalExportByName('CFStringGetLength'),'int', ['pointer']);
const CFShow = new NativeFunction(Module.getGlobalExportByName('CFShow'),'pointer', ['pointer']);

export function CFStringToUtf8(cfString: NativePointer): string | null 
{
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
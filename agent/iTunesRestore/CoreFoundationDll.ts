import { log } from "../logger";

const kCFStringEncodingASCII = 0x0600;
const kCFStringEncodingUTF8 = 0x08000100;

const kCFNumberSInt32Type = 3;
const kCFNumberSInt64Type = 4;

const CFStringGetCStringPtr = new NativeFunction(Module.getGlobalExportByName('CFStringGetCStringPtr'),'pointer', ['pointer', 'int']);
const CFStringGetCString = new NativeFunction(Module.getGlobalExportByName('CFStringGetCString'),'int', ['pointer', 'pointer', 'int', 'int']);    
const CFStringGetLength = new NativeFunction(Module.getGlobalExportByName('CFStringGetLength'),'int', ['pointer']);
const CFShow = new NativeFunction(Module.getGlobalExportByName('CFShow'),'pointer', ['pointer']);

// 1. 获取 Core Foundation 字典操作相关的函数指针
const CFDictionaryGetCount = new NativeFunction(Module.getGlobalExportByName("CFDictionaryGetCount"),'int', ['pointer']);
const CFDictionaryGetKeysAndValues = new NativeFunction(Module.getGlobalExportByName("CFDictionaryGetKeysAndValues"),'void', ['pointer', 'pointer', 'pointer']);
const CFGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFGetTypeID"),'int', ['pointer']);
const CFStringGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFStringGetTypeID"),'int', []);
const CFBooleanGetValue = new NativeFunction(Module.getGlobalExportByName("CFBooleanGetValue"),'int', ['pointer']);
const CFNumberGetValue = new NativeFunction(Module.getGlobalExportByName("CFNumberGetValue"),'int', ['pointer', 'int', 'pointer']);

export function CFStringToUtf8(inCFStringRef: NativePointer): string | null 
{
    if (inCFStringRef.isNull()|| inCFStringRef.equals(ptr(-1)))
    {
        return null;
    }

    try {
        var typeID = CFGetTypeID(inCFStringRef);
        if (typeID !== CFStringGetTypeID()) {
            if (typeID === 21) { // 或 typeID === CFBooleanGetTypeID()
                var boolValue = CFBooleanGetValue(inCFStringRef);
                return boolValue ? "true" : "false";
            }

            // --- 新增：处理 CFNumber ---
            if (typeID === 22) { // 或 typeID === CFNumberGetTypeID()
                // 尝试作为 64 位整数读取
                var numBuffer = Memory.alloc(8);
                var success = CFNumberGetValue(inCFStringRef, kCFNumberSInt64Type, numBuffer);
                if (success !== 0) {
                    return numBuffer.readS64().toString();
                }
                // 如果失败，可以尝试作为 32 位整数或浮点数读取
                return "try cast int32";
            }

            return `(typeID=${typeID})`;

        }
    } catch (e) {
        return `(CFGetTypeID failed: ${e})`;
    }

    var cStrPtr = CFStringGetCStringPtr(inCFStringRef, kCFStringEncodingUTF8);
    if (!cStrPtr.isNull()) {
        return cStrPtr.readUtf8String();
    }

    var length = CFStringGetLength(inCFStringRef);
    // 每个字符最多 4 字节 UTF-8 + 终止符
    var bufferSize = length * 4 + 1;
    var buffer = Memory.alloc(bufferSize);
    var success = CFStringGetCString(inCFStringRef, buffer, bufferSize, kCFStringEncodingUTF8);
    if (success) {
        return buffer.readUtf8String();
    }
        
    return null;
}

export function PrintCFDictionary(inCFDictionaryRef: NativePointer): void{
   if (inCFDictionaryRef.isNull()) {
        log("[*] 字典指针为空");
        return;
    }

    // 获取字典中键值对的数量
    var count = CFDictionaryGetCount(inCFDictionaryRef);
    log(`[*] 字典包含 ${count} 个键值对`);

    if (count === 0) {
        return;
    }

    // 分配内存来存储键和值的指针数组
    var keysPtr = Memory.alloc(count * Process.pointerSize);
    var valuesPtr = Memory.alloc(count * Process.pointerSize);

    // 获取所有键和值
    CFDictionaryGetKeysAndValues(inCFDictionaryRef, keysPtr, valuesPtr);

    // 遍历并打印每个键值对
    for (var i = 0; i < count; i++) {
        var keyPtr = keysPtr.add(i * Process.pointerSize).readPointer();
        var valuePtr = valuesPtr.add(i * Process.pointerSize).readPointer();

        // 将 CFStringRef 转为 JavaScript 字符串
        var keyStr = CFStringToUtf8(keyPtr);
        var valueStr = CFStringToUtf8(valuePtr);

        log(`[${i}] ${keyStr} = ${valueStr}`);
    }
}


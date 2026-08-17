import { log } from "../logger";

const kCFStringEncodingASCII = 0x0600;
const kCFStringEncodingUTF8 = 0x08000100;

const kCFNumberSInt32Type = 3;
const kCFNumberSInt64Type = 4;
// string
const CFStringGetCStringPtr = new NativeFunction(Module.getGlobalExportByName('CFStringGetCStringPtr'), 'pointer', ['pointer', 'int']);
const CFStringGetCString = new NativeFunction(Module.getGlobalExportByName('CFStringGetCString'), 'int', ['pointer', 'pointer', 'int', 'int']);
const CFStringGetLength = new NativeFunction(Module.getGlobalExportByName('CFStringGetLength'), 'int', ['pointer']);
const CFShow = new NativeFunction(Module.getGlobalExportByName('CFShow'), 'pointer', ['pointer']);

// 1. 获取 Core Foundation 字典操作相关的函数指针
export const CFDictionaryGetValue = new NativeFunction(Module.getGlobalExportByName("CFDictionaryGetValue"), 'pointer', ['pointer', 'pointer']);
const CFDictionaryGetCount = new NativeFunction(Module.getGlobalExportByName("CFDictionaryGetCount"), 'int', ['pointer']);
const CFDictionaryGetKeysAndValues = new NativeFunction(Module.getGlobalExportByName("CFDictionaryGetKeysAndValues"), 'void', ['pointer', 'pointer', 'pointer']);

const CFGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFGetTypeID"), 'ulong', ['pointer']);
const CFStringGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFStringGetTypeID"), 'ulong', []);
const CFBooleanGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFBooleanGetTypeID"), 'ulong', []);
const CFNumberGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFNumberGetTypeID"), 'ulong', []);
const CFArrayGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFArrayGetTypeID"), 'ulong', []);
const CFDictionaryGetTypeID = new NativeFunction(Module.getGlobalExportByName("CFDictionaryGetTypeID"), 'ulong', []);

const CFBooleanGetValue = new NativeFunction(Module.getGlobalExportByName("CFBooleanGetValue"), 'int', ['pointer']);
const CFNumberGetValue = new NativeFunction(Module.getGlobalExportByName("CFNumberGetValue"), 'int', ['pointer', 'int', 'pointer']);

const Tag = 'CoreFoundationDll';

export function CFTypeToUtf8(inCFTypeRef: NativePointer): string | null {
    if (inCFTypeRef.isNull() || inCFTypeRef.equals(ptr(-1))) {
        return null;
    }

    try {
        var typeID = CFGetTypeID(inCFTypeRef);
        switch (typeID) {
            case CFStringGetTypeID():
                var cStrPtr = CFStringGetCStringPtr(inCFTypeRef, kCFStringEncodingUTF8);
                if (!cStrPtr.isNull()) {
                    return cStrPtr.readUtf8String();
                }
                var length = CFStringGetLength(inCFTypeRef);
                // 每个字符最多 4 字节 UTF-8 + 终止符
                var bufferSize = length * 4 + 1;
                var buffer = Memory.alloc(bufferSize);
                var success = CFStringGetCString(inCFTypeRef, buffer, bufferSize, kCFStringEncodingUTF8);
                if (success) {
                    return buffer.readUtf8String();
                } else
                    return null;

            case CFBooleanGetTypeID():
                var boolValue = CFBooleanGetValue(inCFTypeRef);
                return boolValue ? "true" : "false";

            case CFNumberGetTypeID():
                // 尝试作为 64 位整数读取
                var numBuffer = Memory.alloc(8);
                var success = CFNumberGetValue(inCFTypeRef, kCFNumberSInt64Type, numBuffer);
                if (success !== 0) {
                    return numBuffer.readS64().toString();
                }
                // 如果失败，可以尝试作为 32 位整数或浮点数读取
                return `[${Tag}]: kCFNumberSInt32Type Not Implemented`;

            case CFArrayGetTypeID():
                return `[${Tag}]: CFrray Not Implemented`

            case CFDictionaryGetTypeID():
                return `[${Tag}]: CFDictionaryGetTypeID Not Implemented`

            default:
                return `[${Tag}]: Unparsed typeID=${typeID}`;
        }
    } catch (e) {
        return `[${Tag}]: CFGetTypeID failed: ${e}`;
    }
}
export function PrintCFDictionary(inCFDictionaryRef: NativePointer): void {
    if (inCFDictionaryRef.isNull()) {
        log(`[${Tag}]: [*] 字典指针为空"`);
        return;
    }

    // 获取字典中键值对的数量
    var count = CFDictionaryGetCount(inCFDictionaryRef);
    log(`[${Tag}]: [*] 字典包含 ${count} 个键值对`);

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
        var keyStr = CFTypeToUtf8(keyPtr);
        var valueStr = CFTypeToUtf8(valuePtr);

        log(`[${Tag}]: [${i}] ${keyStr} = ${valueStr}`);
    }
}
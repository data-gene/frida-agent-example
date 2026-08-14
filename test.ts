function findSubArray(haystack: Uint8Array, needle: Uint8Array): boolean {
    console.log(`${findSubArray.name}`)
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let found = true;
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                found = false;
                break;
            }
        }
        if (found) {
            return true;
        }
    }
    return false;
}

let fullData = new Uint8Array([0x00, 0x00, 0x00, 0x00,0x62, 0x70, 0x6c, 0x69, 0x73, 0x74, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
let needle = new Uint8Array([0x62, 0x70, 0x6c, 0x69, 0x72, 0x74]);

let bRet = findSubArray(fullData, needle);

console.log(`bRet=${bRet}`);
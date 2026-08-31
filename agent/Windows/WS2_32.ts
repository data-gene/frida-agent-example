import { kPrintSize, log } from "../logger";

function FindSubArray(haystack: Uint8Array, needle: Uint8Array): boolean {
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

const g_log_dir = 'D:/dump';

export function WS2_32(): void {
    let Tag = WS2_32.name;
    let g_send_idx = 0;
    let g_recv_idx = 0;
    let g_exclude_flag = new Uint8Array([0x62, 0x70, 0x6c, 0x69, 0x73, 0x74, 0x30, 0x30,
        0xd2, 0x01, 0x02, 0x03, 0x04, 0x58, 0x44, 0x61, 0x74, 0x61, 0x53, 0x69, 0x7a, 0x65]); // bplist00�XDataSize
    //socket
    Interceptor.attach(Module.getGlobalExportByName("send"), {
        onEnter(args) {
            //log(`[${Tag}]: send(fd=${args[0]}, data=${args[1]}),size=${args[2]}`);
            const fullData = args[1].readByteArray(args[2].toInt32());
            if (fullData && args[2].toInt32() > 16) {
                let arrData = new Uint8Array(fullData);
                if (
                    arrData[0] == 0x3c && arrData[1] == 0x3f && arrData[2] == 0x78 && arrData[3] == 0x6d && arrData[4] == 0x6c && arrData[5] == 0x20
                    || (
                        arrData[0] == 0x62 && arrData[1] == 0x70 && arrData[2] == 0x6c && arrData[3] == 0x69 && arrData[4] == 0x73 && arrData[5] == 0x74 
                        && arrData[6] == 0x30 && arrData[7] == 0x30
                        //&& arrData[8] != 0xd2 && arrData[9] != 0x01 && arrData[10] != 0x02 && arrData[11] != 0x03 && arrData[12] != 0x04
                        //&& arrData[13] != 0x58 && arrData[14] != 0x44 && arrData[15] != 0x61 && arrData[16] != 0x74 && arrData[17] != 0x61
                        //&& arrData[18] != 0x53 && arrData[19] != 0x69 && arrData[20] != 0x7a && arrData[21] != 0x65
                    )
                ) {
                    g_send_idx++;
                    var size = args[2].toInt32() > kPrintSize ? kPrintSize : args[2].toInt32();
                    log(`[SEND ${g_send_idx}]\n${hexdump(args[1], { length: size })}`);
                    File.writeAllBytes(`${g_log_dir}/send${g_send_idx}.plist`, fullData);
                }
            }
        },
        onLeave(retval) { }
    });
    Interceptor.attach(Module.getGlobalExportByName("recv"), {
        onEnter(args) {
            //log(`[${Tag}]: recv(fd=${args[0]}, data=${args[1]}),size=${args[2]}`);
            this.fd = args[0];
            this.data = args[1];
            this.size = args[2];
        },
        onLeave(retval) {
            //log(`[${Tag}]: recv returned= ${retval},fd=${this.fd}, data=${this.data}, size=${this.size}`);
            const fullData = this.data.readByteArray(this.size.toInt32());
            if (fullData && this.size.toInt32() > 16) {
                let arrData = new Uint8Array(fullData);
                if (
                    arrData[0] == 0x62 && arrData[1] == 0x70 && arrData[2] == 0x6c && arrData[3] == 0x69 && arrData[4] == 0x73 && arrData[5] == 0x74
                    || arrData[0] == 0x3c && arrData[1] == 0x3f && arrData[2] == 0x78 && arrData[3] == 0x6d && arrData[4] == 0x6c && arrData[5] == 0x20
                ) {
                    g_recv_idx++;
                    var size = this.size.toInt32() > kPrintSize ? kPrintSize : this.size.toInt32();
                    log(`[${Tag}]: [RECV ${g_recv_idx}]\n${hexdump(this.data, { length: size })}`);
                    File.writeAllBytes(`${g_log_dir}/recv${g_recv_idx}.plist`, fullData);
                }
            }
        }
    });
}
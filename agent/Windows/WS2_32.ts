import { kPrintSize,log } from "../logger";

export function WS2_32():void
{
    let g_send_idx = 0;
    //socket
    Interceptor.attach(Module.getGlobalExportByName("send"), {
        onEnter(args) {
            log(`--->send(fd=${args[0]}, data=${args[1]}),size=${args[2]}`);
            var size = args[2].toInt32()>kPrintSize ? kPrintSize : args[2].toInt32();
            log(`\n${hexdump(args[1], {length: size})}`);
            const fullData = args[1].readByteArray(args[2].toInt32());
            if (fullData && args[2].toInt32()>16)
            {
                g_send_idx++;
                let fileSubffix = "plist";
                let fullDataArray = new Uint8Array(fullData);
                if (
                    fullDataArray[0]==0x62 && fullDataArray[1]==0x70 && fullDataArray[2]==0x6c && fullDataArray[3]==0x69 && fullDataArray[4]==0x73 && fullDataArray[5]==0x74
                    || fullDataArray[0]==0x3c && fullDataArray[1]==0x3f && fullDataArray[2]==0x78 && fullDataArray[3]==0x6d && fullDataArray[4]==0x6c && fullDataArray[5]==0x20
                )
                {
                    File.writeAllBytes(`D:/dump/send${g_send_idx}.${fileSubffix}`, fullData);
                }
            }
        },
        onLeave(retval) {}
    });
    Interceptor.attach(Module.getGlobalExportByName("recv"), {
        onEnter(args) {
            //log(`--->recv(fd=${args[0]}, data=${args[1]}),size=${args[2]}`);
            this.conn = args[0];
            this.data = args[1];
            this.size = args[2];   
        },
        onLeave(retval) {
            log(`--->recv returned: ${retval},fd=${this.conn}, data=${this.data}, size=${this.size}`);
            var size = this.size.toInt32()>kPrintSize ? kPrintSize : this.size.toInt32();
            log(`\n${hexdump(this.data, {length: size})}`);
        }
    });         
}
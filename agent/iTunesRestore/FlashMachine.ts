import { kPrintSize, log } from "../logger";
import { libimobiledevice } from "./libimobiledevice";

export function FlashMachine():void
{
    const Tag = FlashMachine.name;
    libimobiledevice();
}

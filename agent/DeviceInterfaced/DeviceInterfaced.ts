import { DeviceInterfaceCommon } from "./DeviceInterface";
import { DockChannelInterfaceKISPAMClass } from "./DockChannelInterfaceKISPAM";
import { KISInterfaceDebugUSBClass } from "./KISInterfaceDebugUSB";

export function DeviceInterfaced():void
{
    DeviceInterfaceCommon(); 
    KISInterfaceDebugUSBClass();
    DockChannelInterfaceKISPAMClass();
}
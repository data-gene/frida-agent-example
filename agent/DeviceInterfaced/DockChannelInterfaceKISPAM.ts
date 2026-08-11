import { log, printCallStack } from "../logger.js";
import ObjC from "frida-objc-bridge";

export function DockChannelInterfaceKISPAMClass():void
{
    var idx = 0;
    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- writeData:channel:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM writeData:${args[0]},${args[1]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- writeRemainingBytes:channelDockDataBase:dockChannelID:writeData:writeRemainingBytesCount:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM writeRemainingBytes:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    
    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- writeWords:channelDockDataBase:dockChannelID:writeData:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM writeWords:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- readRSTAT:dockChannelID:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM readRSTAT:${args[0]},${args[1]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- readRemainingBytes:readRemainingBytesCount:channelDockDataBase:dockChannelID:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM readRemainingBytes:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- readWords:channelDockDataBase:dockChannelID:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM readWords:${args[0]},${args[1]},${args[2]},${args[3]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        ObjC.classes.DockChannelInterfaceKISPAM['- readWSTAT:dockChannelID:'].implementation,
        {
            onEnter:function(args){
                log(`-[DockChannelInterfaceKISPAM readWSTAT:${args[0]},${args[1]}]`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
}

import { log, printCallStack } from "../logger";

export function DeviceInterfaceCommon():void
{
    const m = Module.load('/Library/Apple/System/Library/PrivateFrameworks/DeviceInterface.framework/Support/deviceinterfaced');
    // log(`=====`);
    // log(`deviceinterfaced symbols(${m.enumerateSymbols().length}): ${m.enumerateSymbols().map(s => s.name).join('\n')}`);
    // log(`=====`);
    // log(`deviceinterfaced exports(${m.enumerateExports().length}): ${m.enumerateExports().map(e => e.name).join('\n')}`);
    // log(`=====`);
    // log(`deviceinterfaced imports(${m.enumerateImports().length}): ${m.enumerateImports().map(i => i.name).join('\n')}`);
    
    Interceptor.attach(
        Module.getGlobalExportByName("IOConnectCallAsyncMethod"), 
        {
            onEnter:function(args){
                //log(`IOConnectCallAsyncMethod(${args[2]}, ${args[3]}, ${args[4]}, ${args[5]})`);
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
/*
    Interceptor.attach(
        Module.getGlobalExportByName("dock_channel_interface_kis_pam_endpoint_response_callback"), 
        {
            onEnter:function(args){
                log(`dock_channel_interface_kis_pam_endpoint_response_callback(${args[0]}, ${args[1]}, ${args[2]})`);
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
   
    Interceptor.attach(
        Module.getGlobalExportByName("dock_channel_interface_kis_pam_handle_write_data"), 
        {
            onEnter:function(args){
                log(`dock_channel_interface_kis_pam_handle_write_data(${args[0]}, ${args[1]}, ${args[2]})`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
*/
    Interceptor.attach(
        Module.getGlobalExportByName("dock_channel_interface_listener_kis_pam_create"), 
        {
            onEnter:function(args){
                log(`dock_channel_interface_listener_kis_pam_create(${args[0]}, ${args[1]})`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        Module.getGlobalExportByName("dock_channel_interface_kis_pam_create"), 
        {
            onEnter:function(args){
                log(`dock_channel_interface_kis_pam_create(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );

    Interceptor.attach(
        Module.getGlobalExportByName("debug_usb_interface_client_transfer_buffer"), 
        {
            onEnter:function(args){
                log(`debug_usb_interface_client_transfer_buffer(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`);
                printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        Module.getGlobalExportByName("debug_usb_interface_client_transfer_buffer_async"), 
        {
            onEnter:function(args){
                //log(`debug_usb_interface_client_transfer_buffer_async(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`);
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
    Interceptor.attach(
        Module.getGlobalExportByName("kis_serialize_to_buffer"), 
        {
            onEnter:function(args){
                log(`kis_serialize_to_buffer(${args[0]}, ${args[1]}, ${args[2]}, 
                    ${args[3]},${args[4]},${args[5]},${args[6]})`);
                    
                //printCallStack(this.context);
            },
            onLeave:function(retval){}
        }
    );
} 
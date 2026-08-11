export const kPrintSize = 16*10;

export function log(message: string): void {
    var now = new Date();
    //utc time
    //now.toISOString()
    //local time
    var ms = now.getMilliseconds().toString();
    var localeTime = now.toLocaleTimeString() + '.' + ms;
    console.log(`[${localeTime}] [${Process.getCurrentThreadId()}] ${message}`);
}

export function printCallStack(curContext: any): void {
    log('backtrace:\n'+
        Thread.backtrace(curContext, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress).join('\n')+
        '\n');
}

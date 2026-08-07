
export function log(message: string): void {
    console.log(message);
}

export function printCallStack(curContext: any): void {
    log('--->backtrace:\n'+
        Thread.backtrace(curContext, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress).join('\n')+
        '\n');
}

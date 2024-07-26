let workerPort;
let data = {
    type:"eventFromWoker", 
    payload: {name:"init"}
};
function workerPortListener(e) {
    workerPort = e.ports[0];
    console.log(e.data);
    
    workerPort.postMessage(data);
}

// addEventListener("message", workerPortListener);
globalThis.onmessage = workerPortListener;
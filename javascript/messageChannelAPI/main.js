let {port1: mainPort, port2: workerPort} = new MessageChannel();

let worker = new Worker("worker-code.js");
let data = {
    type: "eventFromMain",
    payload: { name: "init" }
};
worker.postMessage(data, [workerPort]);

mainPort.onmessage = (e) => console.log(e.data);
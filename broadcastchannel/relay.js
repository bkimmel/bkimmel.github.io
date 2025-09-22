const bc = new BroadcastChannel('worker_relay');
bc.onmessage = (msg)=>{
    console.log(`Message to worker:`);
    console.dir(msg);
    self.postMessage(msg.data);
}
self.onmessage = (e)=> {
    bc.postMessage(e.data);
}
window.addEventListener("load", () => {
    console.log("window.onload event fired");
});

window.addEventListener("beforeunload", () => {
    console.log("window.before unload event fired");
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "hidden") {
        return;
    }
    console.log("document visibility change event fired");
});

var p1 = new Promise(resolve => {
    window.addEventListener("load", () => {
        resolve();
    });
});

var p2 = new Promise(resolve => {
    window.addEventListener("beforeunload", () => {
        resolve();
    });
});

var p3 = new Promise(resolve => {
    window.addEventListener("visibilitychange", () => {
        resolve();
    });
});

Promise.race([p1, p2, p3]).then(() => {
    console.log("Promise");
});

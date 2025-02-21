// Event Listeners
// https://www.youtube.com/watch?v=XF1_MlZ5l6M&t=685s&ab_channel=WebDevSimplified

// In this exercise, we will learn how to delay doing something until one of the following happens.
// We will use the window.onload event to run some code when the window is fully loaded.
// We will use the window.beforeunload event to run some code before the window is unloaded.
// We will use the document.visibilitychange event to run some code when the document becomes hidden.
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

// If you want to wait for the document to be fully loaded before running some code, you can use the document.readyState property.
// The document.readyState property returns the loading status of the current document.
// The document.readyState property returns one of the following values:
// loading - The document is still loading.
// interactive - The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets, and frames are still loading.
// complete - The document and all sub-resources have finished loading.
if (document.readyState === "complete") {
    console.log("document.readyState event fired");
} else {
    var p1 = new Promise(resolve => {
        window.addEventListener("load", () => {
            resolve();
        });
    });
}

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

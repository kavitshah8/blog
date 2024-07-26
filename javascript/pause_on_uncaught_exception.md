
Demystifying the difference between the browser's `pause on uncaught exceptions` vs. `onunhandledPromiserejection` event

Ever wondered why does the browser pause on uncaught exceptions even when the promise rejections are handled? 

Developers often get confused between the "pause on uncaught exceptions" vs. on-unhandledPromiserejection event. 

Let's try to clarify the subtle difference between them. 

### "pause on uncaught exceptions" will pause when the exception is thrown or the promise is rejected. 

    The browser knows if there is any catch block for synchronous functions and exceptions since that is part of the JS syntax. 

    The catch handler is decoupled for promise rejections, and the browser doesn't know at the time of rejection if the handler will be added.

    Note only Chromium browsers' dev tools pause on promise rejections. Other browsers only break on exceptions/errors.

### window.addEventListener("unhandledPromiserejection", () => { ... }) OR onunhandledPromiserejection = () => { ... }

    On the other hand, the browser can wait a bit before deciding if it's genuinely an unhandled promise rejection event before triggering onunhandledPromiserejection. 

### Examples: 


| Code        | pause on uncaught exception | onunhandledPromiserejection = () => { ... } |
| ----------- | ----------- | ----------------------------------------------------------------------------------- | 
| `Promise.reject(new Error("Reject")).catch(() => {});`      | Yes       | No |
| `new Promise((resolve, reject) => reject(new Error("custom promise"))).catch(e => {});`   | Yes        | No |
| `(async function test() { throw new Error("throw from async function"); })().catch(e => {});` | Yes | No |
|  |  |  |
| `(async function test() { try { await Promise.reject(new Error("catch inside async function")); } catch(e) { } })();` | No (surprisingly the browser is aware of the catch block)  | No |         
| `(async function test() { try { await new Promise((resolve, reject) => reject(new Error("catch inside async function"))); } catch(e) { } })();` | Yes (Promise.reject() should be equivalent to new Promise((resolve, reject) => reject()), but maybe it's not in the debugger)  | No |
|  |  |  | 
| `new Promise((resolve, reject) => setTimeout(reject, 0, new Error("custom promise delayed"))).catch(e => {});` | No (async reject) | Yes|
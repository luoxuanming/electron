// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const electron = require("electron");
const fs = require("fs");
let oBtn = document.getElementById("btn");
oBtn.onclick = function () {
  console.log("getCPUUsage:", process.getCPUUsage())
}

// Files 对象实例
const dragWrapper = document.getElementById("drag_test");
dragWrapper.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const path = files[0].path;
    console.log("path:", path);
    const content = fs.readFileSync(path);
    console.log(content.toString())
  }
});

dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});

//webview实例
// const wb = document.getElementById("wb");
// const loading = document.querySelector("#loading")
// wb.addEventListener("did-start-loading", () => {
//   loading.innerHTML = "loading..."
// });
//   wb.addEventListener("did-stop-loading", () => {
//     loading.innerHTML = "OK."
//     wb.insertCSS(`
//     #su {
//       background: red !important;
//     }
// `);
//   wb.executeJavaScript(`
//     setTimeout(()=>{
//       alert(document.getElementById('su').value);
//     },2000);
//   `);  
//   // wb.openDevTools();
// });



//打开新窗口
let subWin;
function openNewWindow() {
  subWin = window.open("popup_page.html", "popup");
}
window.addEventListener("message", (msg) => {
  console.log("接受到的消息:", msg)
})

let oBtn2 = document.getElementById("btn2");
oBtn2.onclick = function () {
  openNewWindow()
}

let oCloseBtn = document.getElementById("close-btn");
oCloseBtn.onclick = function () {
  subWin.close();
}
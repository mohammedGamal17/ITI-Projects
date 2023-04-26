// window.addEventListener("load", function () {
//   // preventInspectElement();
// }); // window loaded

// /*
//  * Prevent Inspect Element *
//  */
// function preventInspectElement() {
//   document.addEventListener("contextmenu", (event) => event.preventDefault());
//   document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//       e.preventDefault();
//       return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
//       e.preventDefault();
//       return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
//       e.preventDefault();
//       return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
//       e.preventDefault();
//       return false;
//     }
//     if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
//       e.preventDefault();
//       return false;
//     }
//   };
// }

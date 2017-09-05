const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function (selector, callback) {
  const queue = [];
  if (document.readyState !== "complete" && typeof(callback) === "function") {
    queue.push(callback);
  }
  if (document.readyState === "complete" && typeof(callback) === "function") {
    queue.push(callback);
    queue.forEach ((func) => {
      func();
    });
  }

  if (selector instanceof(HTMLElement)) {
    return new DOMNodeCollection(Array.from(selector));
  }
  const nodeList = document.querySelectorAll(selector);
  return new DOMNodeCollection(Array.from(nodeList));
};

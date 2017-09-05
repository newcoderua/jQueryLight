class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string === undefined) {
      return this.array[0].innerHTML;
    } else {
      this.array.forEach ( (el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(content) {
    this.array.forEach( (el) => {
      el.insertAdjacentHTML("beforeend", content);
    });
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.array.forEach( node => node.setAttribute(key, val) );
    } else {
      return this.array[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.array.forEach( (el) => {
      el.classList.add(className);
    });
    return this.array;
  }

  removeClass(className) {
    this.array.forEach( (el) => {
      el.classList.remove(className);
    });
    return this.array;
  }

  children() {
    let answer = [];
    this.array.forEach( (el) => {
      answer = answer.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(answer);
  }

  parent() {
    let answer = [];
    this.array.forEach( (el) => {
      if (!answer.includes(el.parentElement)) {
        answer = answer.concat(el.parentElement);
      }
    });
    return new DOMNodeCollection(answer);
  }

  find(selector) {
    let answer = [];
    this.array.forEach( (el) => {
      answer = answer.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(answer);
  }

  css(style, value) {
    if (this.attr('style') === null) {
      return this.attr(`style`, `${style}: ${value};`)
    } else {
      this.attr('style', this.attr('style').concat(`${style}: ${value};`))
    }
  }

  remove() {
    this.array.forEach( (el) => {
      el.remove();
    });
  }

  on(eve, func) {
    this.array.forEach( (el) => {
      el.addEventListener(eve, func);
      el[eve] = func;
    });
  }

  off(eve) {
    let func = this.func;
    this.array.forEach( (el) => {
      el.removeEventListener(eve, el.func[eve]);
    });
  }

  extend(...args) {
    let result = {};
    args.forEach( (el) => {
      for(var key in el) {
        if (el.hasOwnProperty(key)) {
          result[key] = el[key];
        }
      }
    });
    return result;
  }

  ajax(options) {
    let normal = {
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      type: "GET",
      data: "data",
      success(data) {
        console.log('default success');
      },
      error() {
        console.error("default error");
      }
    };
    let request = this.extend(normal, options);

    const xhr = new XMLHttpRequest();
    xhr.open(request.type, request.url);
    xhr.onload = function() {
      console.log(xhr.status);
      console.log(xhr.responseType);
      console.log(xhr.response);
    };

    const optionalData = request.data;
    xhr.send(optionalData);
  }


}

module.exports = DOMNodeCollection;

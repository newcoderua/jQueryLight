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
    return answer;
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
}

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

$l.extend = function(target, ...objects) {
  objects.forEach((object) => {
    Object.keys(object).forEach((key) => {
      target[key] = object[key];
    });
  });
  return target;
};

$l.ajax = function(options) {
  var defaultGifs = "animals";
  if ($('input#textarea').val() !== "") {
    defaultGifs = $('input#textarea').val().split(' ').join("+")
  }

  const defaults = {
      url: `http://api.giphy.com/v1/gifs/search?q=${defaultGifs}&api_key=627abada91c14e1bba8cbb692d5863ef&limit=100`,
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: (response) => (window.resp = response),
      error: (status) => console.log(status),
      data: {}
    };

  const settings = $l.extend({}, defaults, options);
  const sender = new XMLHttpRequest();

  sender.open(settings.method, settings.url);
  sender.onload = () => {
    if(sender.status === 200)
      settings.success(JSON.parse(sender.response));
    else {
      settings.error(sender.statusText);
    }
  };

  sender.send(settings.data);
};

window.addEventListener("DOMContentLoaded", () => {

});

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

window.addEventListener('submit', (e) => {
    e.preventDefault();
    $l.ajax({})
    if (window.resp === undefined) {
      return;
    }
    shuffle(window.resp.data).forEach(el => {
      $l('ul#main').append(`
        <li id="${el.id}">
          <img class="img-gif" src="${el.images.downsized.url}">
          <button type="button" onclick="deleteGif(${el.id})">DELETE</button>
          <button type="button" onclick="likeGif(${el.id})">LIKE</button>
          <button type="button" onclick="dislikeGif(${el.id})">DISLIKE</button>
        </li>`)
    })

});

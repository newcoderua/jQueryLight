# jQueryLight

jQueryLight is a lightweight JavaScript library inspired by jQuery. jQuery is widely used for making AJAX requests, handling events, manipulating the DOM, and guaranteeing it works across browsers. jQueryLight mimics most of this functionality using the native DOM API that is built right in to every browser.


## Features

- Select html elements by id, class or tag
- Add and remove elements on a page
- Traverse DOM using parent and children methods
- Make AJAX requests

## Implementation

### $l(argument)

- output is instance of DOMNodeCollection with a list of all elements that match the provided argument with CSS selector.
- If argument is a function it adds the function to a callback queue so it can be called after document loads.

## DOMNodeCollection prototypes

- html(string) - sets or gets innerHTML of given element based on the type of element.

- empty() - delete content of all nodes

- append(content) - Appends(adds) the outerHTML of an HTML element, a string, or each element in a jQueryLight wrapped collection to the innerHTML of all the nodes

- attr(key, value) - If key only provided, it returns the value for that key. If both arguments are provided it sets the value for the provided key for all the nodes

- addClass(class) - Adds class to all the nodes

- removeClass(class) - Removes class from all the nodes

- css(style, value) - it sets style property to selected elements.

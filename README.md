# ProbaClick

[![Bundle Size](https://badgen.net/bundlephobia/minzip/probaclick)](https://bundlephobia.com/result?p=probaclick)

Do something when someone's probably going to click something.

![ProbaClick Example](probaclick-example.gif "ProbaClick Example")

## Overview

ProbaClick fires a callback when a user hovers over an element for a specified length of time or, if specified, after a user hovers over a link a certain number of times. It's designed under the assumption that when a user spends a certain amount of time hovering over an item, it's likely that they're about click or interact with it in some way. By anticipating that click, you're able to perform an action before the user actually does it.

## Use Cases

The use cases are wide, but perhaps the most common is to dynamically fetch resources when it's likely that a user will click on a link. For example, you might dynamically prefetch a page that a user is probably going to navigate to next.

## Usage

To use, pass a NodeList, Node, or string selector, and define your options.

```javascript
//-- Turn each button red when it's hovered over for a second.
ProbaClick(document.querySelectorAll("button"), {
  callback: function (element) {
    element.style.background = "red";
  },
  delay: 1000,
});
```

### Trigger by Hover Duration or Hover Count

By default, ProbaClick will fire its callback method after a certain amount of total time hovered. For example, if `delay` is set to `1000`, the callback will fire after a user hovers twice at 500ms each, once at 1000ms, or any other number of hovers whose durations add up to at least 1000ms.

However, it's also possible to trigger the callback based on the total number of hovers, regardless of the amount of time spent hovering. The following configuration will fire the callback after a total hover time of 1000ms OR when the user has hovered over the element 3 times.

```javascript
ProbaClick(document.querySelectorAll("button"), {
  callback: function (element) {},
  delay: 1000,
  count: 3,
});
```

After the callback has fired, the total hover time and hover count will be reset to zero.

### Cleaning Up Event Listeners

In some cases (like when using a framework like React), you may need to imperatively remove the event listeners registered by `ProbaClick` before it's had a chance to respond to any interactions. To remove listeners registered by an instance, use the provided `remove()` method. For example, in a React component, usage may look like this:

```javascript
useEffect(() => {
  // Create an instance once the component mounts.
  const instance = ProbaClick("button", {
    // options
  });

  // When it unmounts, remove the listeners registered by ProbaClick.
  return () => {
    instance.remove();
  };
}, []);
```

## Arguments

### Elements

Any of the following are valid:

```javascript
ProbaClick(document.querySelectorAll("a.class")); // ...
```

```javascript
ProbaClick(document.querySelector("a.class")); // ...
```

```javascript
ProbaClick("a.class"); // ...
```

### Options

| Option   | Description                                                                                                                                                                                                                                                                   | Default        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| callback | The function that will fire after the delay is met.                                                                                                                                                                                                                           | `function(){}` |
| delay    | The amount of milliseconds to wait before firing the callback.                                                                                                                                                                                                                | `500`          |
| count    | The number of individual hovers to allow before fireing the callback.                                                                                                                                                                                                         | `null`         |
| max      | The maximum number of times the callback will fire after repeatedly hovering over it. Not specifying this value will allow the callback to fire over and over with no limit as a user meets the hover threshold. After the max has been met, event listeners will be removed. | false          |

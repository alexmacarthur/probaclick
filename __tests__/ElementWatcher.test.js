import ElementWatcher from "../src/ElementWatcher";

let button;
let callback;
let mouseOverEvent;
let mouseLeaveEvent;

const eventOptions = {
  view: window,
  bubbles: true,
  cancelable: true,
};

beforeEach(() => {
  jest.useFakeTimers();
  document.body.innerHTML = `<button>A button</button>`;

  button = document.querySelector("button");
  callback = jest.fn();
  mouseOverEvent = new MouseEvent("mouseover", eventOptions);
  mouseLeaveEvent = new MouseEvent("mouseleave", eventOptions);
});

test("Fires callback after hover is sustained.", () => {
  new ElementWatcher(button, { callback });

  button.dispatchEvent(mouseOverEvent);

  jest.runAllTimers();

  expect(callback).toHaveBeenCalledTimes(1);
});

test("Does not fire calback when no hover occurs.", () => {
  new ElementWatcher(button, { callback });

  jest.runAllTimers();

  expect(callback).not.toBeCalled();
});

test("Fires callback when hover count is met.", () => {
  new ElementWatcher(button, { callback, count: 3 });

  new Array(3).fill().forEach((i) => {
    button.dispatchEvent(mouseOverEvent);
    button.dispatchEvent(mouseLeaveEvent);
  });

  expect(callback).toBeCalled();
});

test("Doesn't fire callback when hover count isn't met.", () => {
  new ElementWatcher(button, { callback, count: 3 });

  new Array(2).fill().forEach((i) => {
    button.dispatchEvent(mouseOverEvent);
    button.dispatchEvent(mouseLeaveEvent);
  });

  expect(callback).not.toBeCalled();
});

test("Fires callback repeatedly.", () => {
  new ElementWatcher(button, { callback, count: 3 });

  new Array(6).fill().forEach((i) => {
    button.dispatchEvent(mouseOverEvent);
    button.dispatchEvent(mouseLeaveEvent);
  });

  expect(callback).toHaveBeenCalledTimes(2);
});

test("Fires callback repeatedly until max has been hit.", () => {
  new ElementWatcher(button, { callback, count: 3, max: 2 });

  new Array(9).fill().forEach((i) => {
    button.dispatchEvent(mouseOverEvent);
    button.dispatchEvent(mouseLeaveEvent);
  });

  expect(callback).toHaveBeenCalledTimes(2);
});

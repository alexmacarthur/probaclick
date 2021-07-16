import ProbaClick from "../src/probaclick";
import * as ElementWatcher from "../src/ElementWatcher";

let elementWatcherSpy;

beforeEach(() => {
  jest.clearAllMocks();
  elementWatcherSpy = jest.spyOn(ElementWatcher, "default");
});

test("Returns instances of ElementWatcher.", () => {
  document.body.innerHTML = `
    <button>A button</button>
  `;

  ProbaClick("button");

  expect(elementWatcherSpy).toHaveBeenCalledTimes(1);
});

test("Returns multiple instances if elements exist.", () => {
  document.body.innerHTML = `
    <button>A button</button>
    <button>A button</button>
    <button>A button</button>
    <a>A link</a>
  `;

  ProbaClick("button");
  expect(elementWatcherSpy).toHaveBeenCalledTimes(3);
});

test("Returns empty array when no elements exist.", () => {
  document.body.innerHTML = ``;
  ProbaClick("button");
  expect(elementWatcherSpy).toHaveBeenCalledTimes(0);
});

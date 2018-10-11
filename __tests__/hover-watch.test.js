import ProbaClick from '../src/probaclick';
import ElementWatcher from '../src/ElementWatcher';

test("Returns instances of ElementWatcher.", () => {

  document.body.innerHTML = `
    <button>A button</button>
  `;

    let watchers = ProbaClick('button');

    expect(watchers[0]).toBeInstanceOf(ElementWatcher);
});

test("Returns multiple instances if elements exist.", () => {

  document.body.innerHTML = `
    <button>A button</button>
    <button>A button</button>
    <button>A button</button>
    <a>A link</a>
  `;

    expect(ProbaClick('button')).toHaveLength(3);
});

test("Returns empty array when no elements exist.", () => {
    document.body.innerHTML = ``;
    expect(ProbaClick('button')).toHaveLength(0);
});
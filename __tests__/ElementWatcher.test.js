import ElementWatcher from '../src/ElementWatcher';
import { advanceBy, advanceTo, clear } from "jest-date-mock";

afterEach(() => {
    clear();
});

test("Updates timerStore property when starting from nothing.", () => {

    document.body.innerHTML = `
        <button>A button</button>
    `;
    
    let watcher = new ElementWatcher(document.querySelector('button'));
    
    watcher.hoverStart = new Date(2018, 5, 27, 11, 0, 0).getTime(); // 1530115200000
    watcher.timerStore = 0;
    
    advanceTo(new Date(2018, 5, 27, 12, 0, 0)); // 1530118800000

    let result = watcher.updateTimerStore();

    expect(result).toEqual(3600000);
});

test("Updates timerStore property when starting with something.", () => {

    document.body.innerHTML = `
        <button>A button</button>
    `;

    let watcher = new ElementWatcher(document.querySelector('button'));
    
    watcher.hoverStart = new Date(2018, 5, 27, 11, 0, 0).getTime(); // 1530115200000
    watcher.timerStore = 5000;
    
    advanceTo(new Date(2018, 5, 27, 12, 0, 0)); // 1530118800000

    let result = watcher.updateTimerStore();

    expect(result).toEqual(3605000);
});

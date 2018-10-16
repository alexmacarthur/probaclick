import ElementWatcher from '../src/ElementWatcher';
import { advanceBy, advanceTo, clear } from "jest-date-mock";
import { watch } from 'fs';

afterEach(() => {
    clear();
});

test("Updates timerStore property when starting from nothing.", () => {

    document.body.innerHTML = `
        <button>A button</button>
    `;
    
    let watcher = new ElementWatcher(document.querySelector('button'));
    
    watcher.hoverStart = new Date(2018, 5, 27, 11, 0, 0).getTime(); // 1530115200000
    
    advanceTo(new Date(2018, 5, 27, 12, 0, 0)); // 1530118800000

    watcher.updateStoreTime();

    expect(watcher.store.time).toEqual(3600000);
});

test("Updates store's timer property when starting with something.", () => {

    document.body.innerHTML = `
        <button>A button</button>
    `;

    let watcher = new ElementWatcher(document.querySelector('button'));
    
    watcher.hoverStart = new Date(2018, 5, 27, 11, 0, 0).getTime(); // 1530115200000
    
    advanceTo(new Date(2018, 5, 27, 12, 0, 0)); // 1530118800000

    watcher.updateStoreTime();

    expect(watcher.store.time).toEqual(3600000);
});

test("Resets store when called.", () => {

    document.body.innerHTML = `
        <button>A button</button>
    `;

    let watcher = new ElementWatcher(document.querySelector('button'));

    watcher.store = {
        time: 300, 
        interactions: 3
    };

    expect(watcher.store).toEqual({
        time: 300,
        interactions: 3
    });
    
    watcher.resetStore();

    expect(watcher.store).toEqual({
        time: 0,
        interactions: 0
    });
});

test("Updates hasJustFired property accordingly.", () => {
    document.body.innerHTML = `
        <button>A button</button>
    `;

    let watcher = new ElementWatcher(document.querySelector('button'), {
        callback: () => {}
    });

    expect(watcher.hasJustFired).toBe(false);
    
    watcher.fire();
    
    expect(watcher.hasJustFired).toBe(true);
    
    watcher.handleMouseOver();
    
    expect(watcher.hasJustFired).toBe(false);
});

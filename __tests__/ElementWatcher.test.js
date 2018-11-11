import ElementWatcher from '../src/ElementWatcher';
import { advanceBy, advanceTo, clear } from "jest-date-mock";
import { watch } from 'fs';

afterEach(() => {
    clear();
});

beforeEach(() => {
    document.body.innerHTML = `
        <button>A button</button>
    `;
});

test("Updates timerStore property when starting from nothing.", () => {
    
    let watcher = new ElementWatcher(document.querySelector('button'));
    
    watcher.hoverStart = new Date(2018, 5, 27, 11, 0, 0).getTime(); // 1530115200000
    
    advanceTo(new Date(2018, 5, 27, 12, 0, 0)); // 1530118800000

    watcher.updateStoreTime();

    expect(watcher.store.time).toEqual(3600000);
});

test("Updates store's timer property when starting with something.", () => {

    let watcher = new ElementWatcher(document.querySelector('button'));
    
    watcher.hoverStart = new Date(2018, 5, 27, 11, 0, 0).getTime(); // 1530115200000
    
    advanceTo(new Date(2018, 5, 27, 12, 0, 0)); // 1530118800000

    watcher.updateStoreTime();

    expect(watcher.store.time).toEqual(3600000);
});

test("Resets store when called.", () => {

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

    let watcher = new ElementWatcher(document.querySelector('button'), {
        callback: () => {}
    });

    expect(watcher.hasJustFired).toBe(false);
    
    watcher.fire();
    
    expect(watcher.hasJustFired).toBe(true);
    
    watcher.handleMouseOver();
    
    expect(watcher.hasJustFired).toBe(false);
});

describe("maybeFireBasedOnCount", () => {
    test("Returns false when there's no count trigger set.", () => {
        let watcher = new ElementWatcher(document.querySelector('button'), {
            callback: () => {},
            count: null
        });

        expect(watcher.maybeFireBasedOnCount()).toBe(false);
    }); 

    test("Returns false when there is a count trigger set, but interaction count isn't enough.", () => {
        let watcher = new ElementWatcher(document.querySelector('button'), {
            callback: () => {},
            count: 3
        });

        expect(watcher.maybeFireBasedOnCount()).toBe(false);
    }); 

    test("Returns true when there is a count trigger set and interaction count is enough.", () => {
        let watcher = new ElementWatcher(document.querySelector('button'), {
            callback: () => {},
            count: 3
        });

        watcher.store.interactions = 3;

        expect(watcher.maybeFireBasedOnCount()).toBe(true);
    }); 
});

describe("maybeFireBasedOnTime", () => {
    test("Returns false when there's no delay trigger set.", () => {
        let watcher = new ElementWatcher(document.querySelector('button'), {
            callback: () => {},
            delay: null
        });

        expect(watcher.maybeFireBasedOnTime()).toBe(false);
    }); 

    test("Returns true when there is a delay trigger set and hover time is enough.", () => {
        let watcher = new ElementWatcher(document.querySelector('button'), {
            callback: () => {},
            delay: 3
        });

        expect(watcher.maybeFireBasedOnTime()).toBeTruthy();
    }); 
});
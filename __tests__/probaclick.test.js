import ProbaClick from "../src/probaclick";

describe("event listeners", () => {
  test("removes event listeners when remove() is called", () => {
    document.body.innerHTML = `
    <button class="button">Button #1</button>
    <button class="button">Button #2</button>
  `;

    const buttons = document.querySelectorAll("button");
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    buttons.forEach((button) => {
      button.addEventListener = addEventListenerMock;
      button.removeEventListener = removeEventListenerMock;
    });

    const instance = ProbaClick(buttons);
    instance.remove();

    // Called two times for each button.
    expect(addEventListenerMock).toHaveBeenCalledTimes(4);
    expect(removeEventListenerMock).toHaveBeenCalledTimes(4);
  });

  test("does not remove listeners when remove() is not called", () => {
    document.body.innerHTML = `
    <button class="button">Button #1</button>
    <button class="button">Button #2</button>
  `;

    const buttons = document.querySelectorAll("button");
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    buttons.forEach((button) => {
      button.addEventListener = addEventListenerMock;
      button.removeEventListener = removeEventListenerMock;
    });

    ProbaClick(buttons);

    // Called two times for each button.
    expect(addEventListenerMock).toHaveBeenCalledTimes(4);
    expect(removeEventListenerMock).toHaveBeenCalledTimes(0);
  });
});

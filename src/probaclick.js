import ElementWatcher from "./ElementWatcher";
import toArrayOfNodes from "./toArrayOfNodes";

export default function (
  elements,
  { max = null, delay = 500, count = null, callback = () => {} } = {}
) {
  let watchers = toArrayOfNodes(elements).map((link) => {
    return new ElementWatcher(link, {
      delay,
      callback,
      max,
      count,
    });
  });

  return {
    remove: () => {
      watchers.forEach((w) => w.remove());
    },
  };
}

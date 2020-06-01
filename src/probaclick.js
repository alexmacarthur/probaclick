import ElementWatcher from "./ElementWatcher";
import toArrayOfNodes from "./toArrayOfNodes";

export default function (
  elements,
  { max = null, delay = 500, count = null, callback = () => {} } = {}
) {
  return toArrayOfNodes(elements).map((link) => {
    return new ElementWatcher(link, {
      delay,
      callback,
      max,
      count,
    });
  });
}

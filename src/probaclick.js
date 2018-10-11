import ElementWatcher from "./ElementWatcher";
import toArrayOfNodes from "./toArrayOfNodes";

export default function(
  elements,
  { max = null, delay = 500, callback = () => {} } = {}
) {
  elements = toArrayOfNodes(elements);

  if (!elements.length) return [];

  return elements.map(link => {
    return new ElementWatcher(link, {
      delay,
      callback,
      max
    });
  });
}

import Namespace from './Namespace.js';

export  {
  ArraySlice, ObjectSlice, Element, StringElement,
  NumberElement, BooleanElement, NullElement, ArrayElement,
  ObjectElement, MemberElement, RefElement, LinkElement,
  refract,
} from './elements.js';

export { default as KeyValuePair } from './KeyValuePair.js';
export { default as JSONSerialiser } from './serialisers/JSONSerialiser.js';
export { default as JSON06Serialiser } from './serialisers/JSON06Serialiser.js';

// Direct access to the Namespace class
export { Namespace }

// Special constructor for the Namespace class
export function namespace(options) {
  return new Namespace(options);
}

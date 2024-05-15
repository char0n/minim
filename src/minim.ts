import Namespace from './Namespace';

export {
  ArraySlice,
  ObjectSlice,
  Element,
  StringElement,
  NumberElement,
  BooleanElement,
  NullElement,
  ArrayElement,
  ObjectElement,
  MemberElement,
  RefElement,
  LinkElement,
  refract,
} from './elements';

export { default as KeyValuePair } from './KeyValuePair';
export { default as JSONSerialiser } from './serialisers/JSONSerialiser';
export { default as JSON06Serialiser } from './serialisers/JSON06Serialiser';

// Direct access to the Namespace class
export { Namespace };

// Special constructor for the Namespace class
export function namespace(options) {
  return new Namespace(options);
}

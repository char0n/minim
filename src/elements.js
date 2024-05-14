import Element from './primitives/Element.js';
import NullElement from './primitives/NullElement.js';
import StringElement from './primitives/StringElement.js';
import NumberElement from './primitives/NumberElement.js';
import BooleanElement from './primitives/BooleanElement.js';
import ArrayElement from './primitives/ArrayElement.js';
import MemberElement from './primitives/MemberElement.js';
import ObjectElement from './primitives/ObjectElement.js';
import LinkElement from './elements/LinkElement.js';
import RefElement from './elements/RefElement.js';
import ArraySlice from './ArraySlice.js';
import ObjectSlice from './ObjectSlice.js';
import KeyValuePair from './KeyValuePair.js';

/**
 * Refracts a JSON type to minim elements
 * @param value
 * @returns {Element}
 */
function refract(value) {
  if (value instanceof Element) {
    return value;
  }

  if (typeof value === 'string') {
    return new StringElement(value);
  }

  if (typeof value === 'number') {
    return new NumberElement(value);
  }

  if (typeof value === 'boolean') {
    return new BooleanElement(value);
  }

  if (value === null) {
    return new NullElement();
  }

  if (Array.isArray(value)) {
    return new ArrayElement(value.map(refract));
  }

  if (typeof value === 'object') {
    const element = new ObjectElement(value);
    return element;
  }

  return value;
}

Element.prototype.ObjectElement = ObjectElement;
Element.prototype.RefElement = RefElement;
Element.prototype.MemberElement = MemberElement;

Element.prototype.refract = refract;
ArraySlice.prototype.refract = refract;

/**
 * Contains all of the element classes, and related structures and methods
 * for handling with element instances.
 */
export {
  Element,
  NullElement,
  StringElement,
  NumberElement,
  BooleanElement,
  ArrayElement,
  MemberElement,
  ObjectElement,
  LinkElement,
  RefElement,
  refract,
  ArraySlice,
  ObjectSlice,
  KeyValuePair,
};

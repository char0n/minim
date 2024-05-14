const Element = require('./primitives/Element.js');
const NullElement = require('./primitives/NullElement.js');
const StringElement = require('./primitives/StringElement.js');
const NumberElement = require('./primitives/NumberElement.js');
const BooleanElement = require('./primitives/BooleanElement.js');
const ArrayElement = require('./primitives/ArrayElement.js');
const MemberElement = require('./primitives/MemberElement.js');
const ObjectElement = require('./primitives/ObjectElement.js');
const LinkElement = require('./elements/LinkElement.js');
const RefElement = require('./elements/RefElement.js');

const ArraySlice = require('./ArraySlice.js');
const ObjectSlice = require('./ObjectSlice.js');

const KeyValuePair = require('./KeyValuePair.js');

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
module.exports = {
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

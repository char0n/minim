import KeyValuePair from '../KeyValuePair.js';
import Element from './Element.js';

/**
 * @class MemberElement
 *
 * @param {Element} key
 * @param {Element} value
 * @param meta
 * @param attributes
 */
class MemberElement extends Element {
  constructor(key, value, meta, attributes) {
    super(new KeyValuePair(), meta, attributes);

    this.element = 'member';
    this.key = key;
    this.value = value;
  }

  /**
   * @type Element
   */
  get key() {
    return this.content.key;
  }

  set key(key) {
    this.content.key = this.refract(key);
  }

  /**
   * @type Element
   */
  get value() {
    return this.content.value;
  }

  set value(value) {
    this.content.value = this.refract(value);
  }
}

export default MemberElement;

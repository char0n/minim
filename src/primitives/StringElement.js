import Element from './Element.js';

/**
 * @class StringElement
 *
 * @param {string} content
 * @param meta
 * @param attributes
 */
class StringElement extends Element {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'string';
  }

  primitive() {
    return 'string';
  }

  /**
   * The length of the string.
   * @type number
   */
  get length() {
    return this.content.length;
  }
}

export default StringElement;

import Element from './Element.js';

/**
 * @class NumberElement
 *
 * @param {number} content
 * @param meta
 * @param attributes
 */
class NumberElement extends Element {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'number';
  }

  // eslint-disable-next-line class-methods-use-this
  primitive() {
    return 'number';
  }
}

export default NumberElement;

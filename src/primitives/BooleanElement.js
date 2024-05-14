import Element from './Element.js';

/**
 * @class BooleanElement
 *
 * @param {boolean} content
 * @param meta
 * @param attributes
 */
class BooleanElement extends Element {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'boolean';
  }

  // eslint-disable-next-line class-methods-use-this
  primitive() {
    return 'boolean';
  }
}

export default BooleanElement;

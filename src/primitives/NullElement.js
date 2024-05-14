import Element from './Element.js';

class NullElement extends Element {
  constructor(content, meta, attributes) {
    super(content || null, meta, attributes);
    this.element = 'null';
  }

  // eslint-disable-next-line class-methods-use-this
  primitive() {
    return 'null';
  }

  // eslint-disable-next-line class-methods-use-this
  set() {
    return new Error('Cannot set the value of null');
  }
}

export default NullElement;

import Element from './Element.js';

class NullElement extends Element {
  constructor(content, meta, attributes) {
    super(content || null, meta, attributes);
    this.element = 'null';
  }

  primitive() {
    return 'null';
  }

  set() {
    return new Error('Cannot set the value of null');
  }
}

export default NullElement;

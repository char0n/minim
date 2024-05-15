import Element from './Element';
import type { ElementMeta, ElementAttributes } from './Element';

class NullElement extends Element<null> {
  constructor(content: null = null, meta?: ElementMeta, attributes?: ElementAttributes) {
    super(content, meta, attributes);
    this.element = 'null';
  }

  primitive(): 'null' {
    return 'null';
  }

  set() {
    return new Error('Cannot set the value of null');
  }

  get element(): 'null' {
    return super.element as 'null';
  }

  set element(element: 'null') {
    super.element = element;
  }
}

export default NullElement;

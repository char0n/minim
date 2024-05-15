import Element from './Element';
import type { ElementMeta, ElementAttributes } from './Element';

class StringElement<T extends string | undefined = undefined> extends Element<T> {
  constructor(content?: T, meta?: ElementMeta, attributes?: ElementAttributes) {
    super(content, meta, attributes);
    this.element = 'string';
  }

  primitive(): 'string' {
    return 'string';
  }

  get length() {
    if (typeof this.content === 'string') {
      return this.content.length;
    }
    return 0;
  }

  get element(): 'string' {
    return super.element as 'string';
  }

  set element(element: 'string') {
    super.element = element;
  }
}

export default StringElement;

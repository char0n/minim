import Element from './Element';
import type { ElementMeta, ElementAttributes } from './Element';

class NumberElement<T extends number | undefined = undefined> extends Element<T> {
  constructor(content?: T, meta?: ElementMeta, attributes?: ElementAttributes) {
    super(content, meta, attributes);
    this.element = 'number';
  }

  primitive(): 'number' {
    return 'number';
  }

  get element(): 'number' {
    return super.element as 'number';
  }

  set element(element: 'number') {
    super.element = element;
  }
}

export default NumberElement;

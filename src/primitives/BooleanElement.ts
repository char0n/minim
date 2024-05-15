import Element from './Element';
import type { ElementMeta, ElementAttributes } from './Element';

class BooleanElement<T extends boolean | undefined = undefined> extends Element<T> {
  constructor(content?: T, meta?: ElementMeta, attributes?: ElementAttributes) {
    super(content, meta, attributes);
    this.element = 'boolean';
  }

  primitive(): 'boolean' {
    return 'boolean';
  }

  get element(): 'boolean' {
    return super.element as 'boolean';
  }

  set element(element: 'boolean') {
    super.element = element;
  }
}

export default BooleanElement;

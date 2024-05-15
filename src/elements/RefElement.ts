import Element from '../primitives/Element';
import type { ElementMeta, ElementAttributes } from '../primitives/Element';
import type StringElement from '../primitives/StringElement';

class RefElement<T extends string> extends Element<T> {
  constructor(content: T, meta?: ElementMeta, attributes?: ElementAttributes) {
    super(content, meta, attributes);
    this.element = 'ref';

    if (!this.path) {
      this.path = 'element';
    }
  }

  /**
   * Path of referenced element to transclude instead of element itself.
   */
  get path(): StringElement | undefined {
    return this.attributes.get('path');
  }

  set path(path: string | StringElement) {
    this.attributes.set('path', path);
  }

  get element(): 'ref' {
    return super.element as 'ref';
  }

  set element(element: 'ref') {
    super.element = element;
  }
}

export default RefElement;

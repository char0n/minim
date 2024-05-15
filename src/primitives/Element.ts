import { equals } from 'ramda';

import KeyValuePair from '../KeyValuePair';
import ArraySlice from '../ArraySlice';
import type LinkElement from '../elements/LinkElement';
import type RefElement from '../elements/RefElement';
import type ObjectElement from './ObjectElement';
import type StringElement from './StringElement';
import type ArrayElement from './ArrayElement';

export type ElementMeta = Record<string, unknown> | ObjectElement;
export type ElementAttributes = Record<string, unknown> | ObjectElement;

class Element<T = undefined> {
  public _meta!: ObjectElement;

  public _attributes!: ObjectElement;

  public _content!: T;

  public _storedElement: string = 'element';

  constructor(content?: T, meta?: ElementMeta, attributes?: ElementAttributes) {
    // Lazy load this.meta and this.attributes because it's a Minim element
    // Otherwise, we get into circuluar calls
    if (meta) {
      this.meta = meta;
    }

    if (attributes) {
      this.attributes = attributes;
    }

    this.content = content as T;
  }

  /**
   * Freezes the element to prevent any mutation.
   * A frozen element will add `parent` property to every child element
   * to allow traversing up the element tree.
   */
  freeze() {
    if (Object.isFrozen(this)) {
      return;
    }

    if (this._meta) {
      this.meta.parent = this;
      this.meta.freeze();
    }

    if (this._attributes) {
      this.attributes.parent = this;
      this.attributes.freeze();
    }

    this.children.forEach((element) => {
      // eslint-disable-next-line no-param-reassign
      element.parent = this;
      element.freeze();
    }, this);

    if (this.content && Array.isArray(this.content)) {
      Object.freeze(this.content);
    }

    Object.freeze(this);
  }

  primitive() {}

  /**
   * Creates a deep clone of the instance.
   */
  clone(): this {
    const Constructor = this.constructor as new () => this;
    const copy = new Constructor();

    copy.element = this.element;

    if (this.meta.length) {
      copy._meta = this.meta.clone();
    }

    if (this.attributes.length) {
      copy._attributes = this.attributes.clone();
    }

    if (this.content) {
      if (
        typeof this.content === 'object' &&
        'clone' in this.content &&
        typeof this.content.clone === 'function'
      ) {
        copy.content = this.content.clone();
      } else if (Array.isArray(this.content)) {
        copy.content = this.content.map((element) => element.clone());
      } else {
        copy.content = this.content;
      }
    } else {
      copy.content = this.content;
    }

    return copy;
  }

  /**
   */
  toValue() {
    if (this.content instanceof Element) {
      return this.content.toValue();
    }

    if (this.content instanceof KeyValuePair) {
      return {
        key: this.content.key.toValue(),
        value: this.content.value ? this.content.value.toValue() : undefined,
      };
    }

    if (this.content && this.content.map) {
      return this.content.map((element) => element.toValue(), this);
    }

    return this.content;
  }

  /**
   * Creates a reference pointing at the Element.
   */
  toRef(path: string): RefElement {
    if (this.id.toValue() === '') {
      throw Error('Cannot create reference to an element that does not contain an ID');
    }

    const ref = new this.RefElement(this.id.toValue());

    if (path) {
      ref.path = path;
    }

    return ref;
  }

  /**
   * Finds the given elements in the element tree.
   * When providing multiple element names, you must first freeze the element.
   *
   * @param names {...elementNames}
   * @returns {ArraySlice}
   */
  findRecursive(...elementNames) {
    if (arguments.length > 1 && !this.isFrozen) {
      throw new Error(
        'Cannot find recursive with multiple element names without first freezing the element. Call `element.freeze()`',
      );
    }

    const elementName = elementNames.pop();
    let elements = new ArraySlice();

    const append = (array, element) => {
      array.push(element);
      return array;
    };

    // Checks the given element and appends element/sub-elements
    // that match element name to given array
    const checkElement = (array, element) => {
      if (element.element === elementName) {
        array.push(element);
      }

      const items = element.findRecursive(elementName);
      if (items) {
        items.reduce(append, array);
      }

      if (element.content instanceof KeyValuePair) {
        if (element.content.key) {
          checkElement(array, element.content.key);
        }

        if (element.content.value) {
          checkElement(array, element.content.value);
        }
      }

      return array;
    };

    if (this.content) {
      // Direct Element
      if (this.content.element) {
        checkElement(elements, this.content);
      }

      // Element Array
      if (Array.isArray(this.content)) {
        this.content.reduce(checkElement, elements);
      }
    }

    if (!elementNames.isEmpty) {
      elements = elements.filter((element) => {
        let parentElements = element.parents.map((e) => e.element);

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const namesIndex in elementNames) {
          const name = elementNames[namesIndex];
          const index = parentElements.indexOf(name);

          if (index !== -1) {
            parentElements = parentElements.splice(0, index);
          } else {
            return false;
          }
        }

        return true;
      });
    }

    return elements;
  }

  set(content: T): this | Error {
    this.content = content;
    return this;
  }

  equals(value: unknown) {
    return equals(this.toValue(), value);
  }

  getMetaProperty(name: string, value) {
    if (!this.meta.hasKey(name)) {
      if (this.isFrozen) {
        const element = this.refract(value);
        element.freeze();
        return element;
      }

      this.meta.set(name, value);
    }

    return this.meta.get(name);
  }

  setMetaProperty(name: string, value) {
    this.meta.set(name, value);
  }

  get element() {
    return this._storedElement;
  }

  set element(element: string) {
    this._storedElement = element;
  }

  get content(): T {
    return this._content;
  }

  set content(value: T) {
    if (value instanceof Element) {
      this._content = value;
    } else if (value instanceof ArraySlice) {
      this.content = value.elements;
    } else if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === 'null' ||
      value == null
    ) {
      // Primitive Values
      this._content = value;
    } else if (value instanceof KeyValuePair) {
      this._content = value;
    } else if (Array.isArray(value)) {
      this._content = value.map(this.refract);
    } else if (typeof value === 'object') {
      this._content = Object.keys(value).map((key) => new this.MemberElement(key, value[key]));
    } else {
      throw new Error('Cannot set content to given value');
    }
  }

  /**
   * @type ObjectElement
   */
  get meta() {
    if (!this._meta) {
      if (this.isFrozen) {
        const meta = new this.ObjectElement();
        meta.freeze();
        return meta;
      }

      this._meta = new this.ObjectElement();
    }

    return this._meta;
  }

  set meta(value) {
    if (value instanceof this.ObjectElement) {
      this._meta = value;
    } else {
      this.meta.set(value || {});
    }
  }

  /**
   * The attributes property defines attributes about the given instance
   * of the element, as specified by the element property.
   *
   * @type ObjectElement
   */
  get attributes() {
    if (!this._attributes) {
      if (this.isFrozen) {
        const meta = new this.ObjectElement();
        meta.freeze();
        return meta;
      }

      this._attributes = new this.ObjectElement();
    }

    return this._attributes;
  }

  set attributes(value) {
    if (value instanceof this.ObjectElement) {
      this._attributes = value;
    } else {
      this.attributes.set(value || {});
    }
  }

  /**
   * Unique Identifier, MUST be unique throughout an entire element tree.
   */
  get id(): StringElement {
    return this.getMetaProperty('id', '');
  }

  set id(id: string | StringElement) {
    this.setMetaProperty('id', id);
  }

  get classes(): ArrayElement {
    return this.getMetaProperty('classes', []);
  }

  set classes(classes: string[] | ArrayElement) {
    this.setMetaProperty('classes', classes);
  }

  /**
   * Human-readable title of element.
   */
  get title(): StringElement {
    return this.getMetaProperty('title', '');
  }

  set title(title: StringElement) {
    this.setMetaProperty('title', title);
  }

  /**
   * Human-readable description of element
   */
  get description(): StringElement {
    return this.getMetaProperty('description', '');
  }

  set description(description: StringElement) {
    this.setMetaProperty('description', description);
  }

  get links(): ArrayElement {
    return this.getMetaProperty('links', []);
  }

  set links(links: LinkElement[] | ArrayElement) {
    this.setMetaProperty('links', links);
  }

  /**
   * Returns whether the element is frozen.
   */
  get isFrozen() {
    return Object.isFrozen(this);
  }

  /**
   * Returns all of the parent elements.
   * @type ArraySlice
   */
  get parents() {
    let { parent } = this;
    const parents = new ArraySlice();

    while (parent) {
      parents.push(parent);

      // eslint-disable-next-line prefer-destructuring
      parent = parent.parent;
    }

    return parents;
  }

  /**
   * Returns all of the children elements found within the element.
   * @type ArraySlice
   * @see recursiveChildren
   */
  get children() {
    if (Array.isArray(this.content)) {
      return new ArraySlice(this.content);
    }

    if (this.content instanceof KeyValuePair) {
      const children = new ArraySlice([this.content.key]);

      if (this.content.value) {
        children.push(this.content.value);
      }

      return children;
    }

    if (this.content instanceof Element) {
      return new ArraySlice([this.content]);
    }

    return new ArraySlice();
  }

  /**
   * Returns all of the children elements found within the element recursively.
   * @type ArraySlice
   * @see children
   */
  get recursiveChildren() {
    const children = new ArraySlice();

    this.children.forEach((element) => {
      children.push(element);

      element.recursiveChildren.forEach((child) => {
        children.push(child);
      });
    });

    return children;
  }
}

export default Element;

import Element from '../primitives/Element';
import type { ElementMeta, ElementAttributes } from '../primitives/Element';
import type StringElement from '../primitives/StringElement';

/**
 * Hyperlinking MAY be used to link to other resources, provide links to
 * instructions on how to process a given element (by way of a profile or
 * other means), and may be used to provide meta data about the element in
 * which it's found. The meaning and purpose of the hyperlink is defined by
 * the link relation according to RFC 5988.
 */
class LinkElement<T extends string[] | undefined = undefined> extends Element<T> {
  constructor(content?: T, meta?: ElementMeta, attributes?: ElementAttributes) {
    super(content, meta, attributes);
    this.element = 'link';
  }

  /**
   * The relation identifier for the link, as defined in RFC 5988.
   */
  get relation(): StringElement | undefined {
    return this.attributes.get('relation');
  }

  set relation(relation: string | StringElement) {
    this.attributes.set('relation', relation);
  }

  /**
   * The URI for the given link.
   */
  get href(): StringElement | undefined {
    return this.attributes.get('href');
  }

  set href(href: string | StringElement) {
    this.attributes.set('href', href);
  }

  get element(): 'link' {
    return super.element as 'link';
  }

  set element(element: 'link') {
    super.element = element;
  }
}

export default LinkElement;

import { expect } from 'chai';

import { namespace } from '../../src/minim';

const minim = namespace();
const ObjectElement = minim.getElementClass('object');
const StringElement = minim.getElementClass('string');

describe('Element whose attribute has attribute', () => {
  it('returns the correct Refract value', () => {
    const object = new ObjectElement({
      foo: 'bar',
    });
    const string = new StringElement('xyz');

    string.attributes.set('pqr', 1);
    object.attributes.set('baz', string);

    const value = object.attributes.get('baz').attributes.get('pqr').toValue();
    expect(value).to.equal(1);
  });
});

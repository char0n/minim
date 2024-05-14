import { expect } from 'chai';

import { namespace } from '../../src/minim.js';

const minim = namespace();
const ObjectElement = minim.getElementClass('object');
const StringElement = minim.getElementClass('string');

describe('Element whose meta has meta', () => {
  it('returns the correct Refract value', () => {
    const object = new ObjectElement({
      foo: 'bar',
    });
    const string = new StringElement('xyz');

    string.meta.set('pqr', 1);
    object.meta.set('baz', string);

    const pqr = object.meta.get('baz').meta.getValue('pqr');
    expect(pqr).to.equal(1);
  });
});

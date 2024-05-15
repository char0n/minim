import type Element from './primitives/Element';

class KeyValuePair<K extends Element<unknown> | undefined, V extends Element<unknown> | undefined> {
  public key: K;

  public value: V;

  constructor(key?: K, value?: V) {
    this.key = key as K;
    this.value = value as V;
  }

  clone() {
    const clone = new KeyValuePair();

    if (this.key) {
      clone.key = this.key.clone();
    }

    if (this.value) {
      clone.value = this.value.clone();
    }

    return clone;
  }
}

export default KeyValuePair;

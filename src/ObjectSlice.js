import negate from 'lodash/negate.js';

import ArraySlice from './ArraySlice.js';

class ObjectSlice extends ArraySlice {
  map(callback, thisArg) {
    return this.elements.map(member => callback.bind(thisArg)(member.value, member.key, member));
  }

  filter(callback, thisArg) {
    return new ObjectSlice(this.elements.filter(member => callback.bind(thisArg)(member.value, member.key, member)));
  }

  reject(callback, thisArg) {
    return this.filter(negate(callback.bind(thisArg)));
  }

  forEach(callback, thisArg) {
    return this.elements.forEach((member, index) => { callback.bind(thisArg)(member.value, member.key, member, index); });
  }

  /**
   * @returns {array}
   */
  keys() {
    return this.map((value, key) => key.toValue());
  }

  /**
   * @returns {array}
   */
  values() {
    return this.map(value => value.toValue());
  }
}

export default ObjectSlice;

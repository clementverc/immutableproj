class MyImmutable {
  fromJS(data) {
    if (data.isArray()) {
      return this.List(data);
    }
    return this.Map(data);
  }

  Map(data) {
    const value = Object.freeze(data);
    if (!value || typeof value !== 'object') {
      return this.toJS(value);
    }
    return value;
  }

  List(data) {
    const newList = [data];
    return this.toJS(newList);
  }

  // setIn(data) {
  //   return data;
  // }

  toJS(data) {
    const value = Object.freeze(data);
    if (!value || typeof value !== 'object') {
      return value;
    }
    const result = [];
    value.iterate((v) => {
      result.push(this.toJS(v));
    });
    return result;
  }
}

export default MyImmutable;

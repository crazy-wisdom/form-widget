const Observable = function(subscribe) {
  this.subscribe = subscribe;
}

Observable.create = function(fn) {
  return new Observable(observer => {
    fn(observer);
  });
};

Observable.fromEvent = function(element, name) {
  return new Observable(observer => {
    const callback = event => observer.next(event);
    element.addEventListener(name, callback, false);

    return () => element.removeEventListener(name, callback, false);
  });
};

Observable.prototype.map = function(mapFn) {
  const context = this;
  return new Observable(observer => {
    return context.subscribe({
      next: value => observer.next(mapFn(value)),
      error: err => observer.error(err),
      complete: () => observer.complete()
    })
  });
};

export default Observable;

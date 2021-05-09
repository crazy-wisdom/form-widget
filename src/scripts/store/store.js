export default function createStore(reducer) {
  var state;
  var listeners = [];

  var getState = () => state;
  var subscribe = (listener) => {
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
  };

  var dispatch = function(action) {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      if (typeof listener === 'function') {
        listener();
      }
    })
  }

  return {
    getState,
    subscribe,
    dispatch
  };
}

export default function reducer(state = 0, action) {
  if (!action) {
    return state;
  }

  switch(action.type) {
    case 'test1':
      return state + 1
    case 'test2':
      return state + 2;
    default:
      return state;
  }
}

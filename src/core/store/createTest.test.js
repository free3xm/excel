import { createStore } from './createStore';

const intState = { count: 0 };

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      ...state,
      count: state.count + 1,
    };
  }
  return state;
};

describe('createStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, intState);
    handler = jest.fn();
  });

  test('should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test('should retutn object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('shoud return default state', () => {
    expect(store.getState()).toEqual(intState);
  });

  test('shoud change state if action exists', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });

  test("shoud NOT change state if action don't exists", () => {
    store.dispatch({ type: 'NOT_EXISTING_ACTION' });
    expect(store.getState().count).toBe(0);
  });

  test('should call subsriber function', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'ADD' });
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('should NOT call sub if unsubcribe', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({ type: 'ADD' });
    expect(handler).not.toHaveBeenCalled();
  });

  test('sholud dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' }, 500);
      });
      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});

/**
 * Utility function to combine multiple reducers
 */
export function combineReducers(reducers) {
  return (state, action) => {
    return Object.keys(reducers).reduce((newState, key) => {
      newState[key] = reducers[key](state ? state[key] : undefined, action);
      return newState;
    }, {});
  };
}

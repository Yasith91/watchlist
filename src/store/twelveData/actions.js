import * as types from './actionTypes';

export const getTwelveData = symbol => (dispatch, getState) => {
  dispatch({
    types: [types.LOAD_DATA, types.LOAD_DATA_SUCCESS, types.LOAD_DATA_FAIL],
    payload: {
      request: {
        url: `/time_series?apikey=9a9ba629df204491913bcf9069077593&interval=1min&symbol=${symbol}`,
        method: 'get',
      },
    },
  });
};

export const setNewData = data => ({
  type: types.SET_DATA,
  payload: data,
});

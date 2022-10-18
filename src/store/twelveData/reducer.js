import * as types from './actionTypes';

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DATA:
      return { ...state };
    case types.LOAD_DATA_SUCCESS:
      const dataSet = action.payload.data;
      const newObj = state.data;
      newObj[dataSet.meta.symbol] = dataSet.values;
      return { ...state, data: newObj };
    case types.SET_DATA:
      const newData = action.payload;
      const currentDataSet = { ...state.data };
      currentDataSet[newData.symbol] = [newData];
      return { ...state, data: currentDataSet };
    case types.REMOVE_DATA:
      const key = action.payload;
      const currentDataSet2 = { ...state.data };
      delete currentDataSet2[key];
      return { ...state, data: currentDataSet2 };
    case types.SET_DATA_LIST:
      const newObjList = action.payload;
      return { ...state, data: newObjList };
    default:
      return state;
  }
};

// current cv slice
import { createSlice } from '@reduxjs/toolkit';

interface CurrentCvState {
  currentCv: any;
  updatedCv: any;
}

const initialState: CurrentCvState = {
  currentCv: {},
  updatedCv: {},
};

export const currentCvSlice = createSlice({
  name: 'currentCv',
  initialState,
  reducers: {
    setCurrentCv: (state, action) => {
      state.currentCv = action.payload;
    },
    setUpdatedCv: (state, action) => {
      state.updatedCv = action.payload;
    },
  },
});

export const { setCurrentCv, setUpdatedCv } = currentCvSlice.actions;

export default currentCvSlice.reducer;

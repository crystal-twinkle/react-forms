import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultValues, IFormInput } from '../../utils/forms-utils';

interface IForm {
  data: IFormInput;
}

export const initialState: IForm = {
  data: defaultValues,
};

export const formSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    setHookFormData(state, action: PayloadAction<IFormInput>) {
      state.data = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export const formReducer = formSlice.reducer;

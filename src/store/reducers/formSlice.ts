import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultValues, IFormInput } from '../../utils/forms-utils';

interface IForm {
  data: IFormInput;
  dataUn: IFormInput;
  errors: Record<string, string>;
}

export const initialState: IForm = {
  dataUn: defaultValues,
  data: defaultValues,
  errors: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setHookFormData(state, action: PayloadAction<IFormInput>) {
      state.data = action.payload;
    },
    setUncontrolledData(state, action: PayloadAction<IFormInput>) {
      state.dataUn = action.payload;
    },
    saveUncontrolledErrors(state, action: PayloadAction<Record<string, string>>) {
      state.errors = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export const formReducer = formSlice.reducer;

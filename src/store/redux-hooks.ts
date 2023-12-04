import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store';
import { countriesActions } from './reducers/countriesSlice';
import { formActions } from './reducers/formSlice';

const actions = {
  ...countriesActions,
  ...formActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

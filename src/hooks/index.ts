import { AppDispatch, State } from '../types/state';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

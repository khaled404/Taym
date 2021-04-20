import {ActionType} from './actions';

export const saveCategories = (payload: []) => ({
  type: ActionType.SAVE_CATEGORIES,
  payload,
});

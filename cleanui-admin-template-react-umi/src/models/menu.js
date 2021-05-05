import { getMenuData } from '@/services/menu'

export default {
  namespace: 'menu',
  state: {
    menuData: [],
  },
  reducers: {
    SET_STATE: (state, action) => ({ ...state, ...action.payload }),
  },
  effects: {
    *GET_DATA(action, { put, call }) {
      const menuData = yield call(getMenuData)
      yield put({
        type: 'SET_STATE',
        payload: {
          menuData,
        },
      })
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'GET_DATA',
      })
    },
  },
}

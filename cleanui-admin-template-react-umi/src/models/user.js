import { history } from 'umi'
import { notification } from 'antd'
import * as firebase from '@/services/firebase'
import * as jwt from '@/services/jwt'

const mapAuthProviders = {
  firebase: {
    login: firebase.login,
    register: firebase.register,
    currentAccount: firebase.currentAccount,
    logout: firebase.logout,
  },
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout,
  },
}

export default {
  namespace: 'user',
  state: {
    id: '',
    name: '',
    role: '',
    email: '',
    avatar: '',
    authorized: process.env.REACT_APP_AUTHENTICATED || false, // false is default value
    loading: false,
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *LOGIN({ payload }, { put, call, select }) {
      const { email, password } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const { authProvider: autProviderName } = yield select(state => state.settings)
      const success = yield call(mapAuthProviders[autProviderName].login, email, password)
      if (success) {
        yield put({
          type: 'LOAD_CURRENT_ACCOUNT',
        })
        yield history.push('/')
        notification.success({
          message: 'Logged In',
          description: 'You have successfully logged in!',
        })
      }
      if (!success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            loading: false,
          },
        })
      }
    },
    *REGISTER({ payload }, { put, call, select }) {
      const { email, password, name } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const { authProvider } = yield select(state => state.settings)
      const success = yield call(mapAuthProviders[authProvider].register, email, password, name)
      if (success) {
        yield put({
          type: 'LOAD_CURRENT_ACCOUNT',
        })
        yield history.push('/')
        notification.success({
          message: 'Succesful Registered',
          description: 'You have successfully registered!',
        })
      }
      if (!success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            loading: false,
          },
        })
      }
    },
    *LOAD_CURRENT_ACCOUNT(_, { put, call, select }) {
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const { authProvider } = yield select(state => state.settings)
      const response = yield call(mapAuthProviders[authProvider].currentAccount)
      if (response) {
        const { id, email, name, avatar, role } = response
        yield put({
          type: 'SET_STATE',
          payload: {
            id,
            name,
            email,
            avatar,
            role,
            authorized: true,
          },
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    *LOGOUT(_, { put, call, select }) {
      const { authProvider } = yield select(state => state.settings)
      yield call(mapAuthProviders[authProvider].logout)
      yield put({
        type: 'SET_STATE',
        payload: {
          id: '',
          name: '',
          role: '',
          email: '',
          avatar: '',
          authorized: false,
          loading: false,
        },
      })
    },
  },
  subscriptions: {
    setup: ({ dispatch }) => {
      dispatch({
        type: 'LOAD_CURRENT_ACCOUNT',
      })
    },
  },
}

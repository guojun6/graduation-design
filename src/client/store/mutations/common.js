import {typeOf} from '../../../utils/common';

import {
    SET_TOAST,
    SET_USER_INFO,
    SET_IS_LOGIN
} from '../mutation-types';



export default {
    [SET_TOAST](state, payload) {
        switch(typeOf(payload)) {
            case 'string':
                state.toast.txt = payload;
                break;
            case 'number':
                state.toast.showTime = payload;
                break;
            case 'Object':
                state.toast = payload;
                break;
        }
    },
    [SET_USER_INFO](state, data) {
        state.userInfo = data;
    },
    [SET_IS_LOGIN](state, isLogin) {
        state.isLogin = isLogin;
    }
};
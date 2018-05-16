import {
    SET_TOAST,
    SET_USER_INFO,
    SET_IS_LOGIN
} from '../mutation-types';

export default {
    // 设置/显示toast
    setToast(context, payload) {
        context.commit(SET_TOAST, payload);
    },
    // 设置用户信息
    async setUserInfo(context, data) {
        if (data) {
            context.commit(SET_USER_INFO, data.info);
            context.commit(SET_IS_LOGIN, data.isLogin);
            return;
        }
        await fetch(localURLBase + '/userController/getUserInfo' + '?l=1', {
            mode: 'cors',
            credentials: 'include'
        }).then((RES) => {
            return RES.json();
        }).then((res) => {
            if (res.status === 200) {
                context.commit(SET_USER_INFO, res.data);
                context.commit(SET_IS_LOGIN, true);
            } else {
                context.commit(SET_IS_LOGIN, false);
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    setIsLogin(context, isLogin) {
        context.commit(SET_IS_LOGIN, isLogin);
    },
};

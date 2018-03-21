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
    setUserInfo(context) {
        fetch(devURLBase + '/userController/getUserInfo').then((RES) => {
            return RES.json();
        }).then((res) => {
            if (res.status === 200) {
                context.commit(SET_USER_INFO, res.data);
                context.commit(SET_IS_LOGIN, true);
            } else if (res.status === 300) {
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

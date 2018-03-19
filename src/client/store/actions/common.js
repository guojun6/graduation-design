import {SET_TOAST} from '../mutation-types';

export default {
    setToast(context, payload) {
        context.commit(SET_TOAST, payload);
    }
};
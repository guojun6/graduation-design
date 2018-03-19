import {typeOf} from '../../../utils/common';

import {SET_TOAST} from '../mutation-types';



export default {
    [SET_TOAST](state, payload) {
        console.log(payload, typeOf(payload))
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
    }
};
import {TEST} from '../mutation-types';

export default {
    [TEST](state) {
        state.a += 'a';
    }
};
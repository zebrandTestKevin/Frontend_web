import Vue from 'vue';
import Vuex from 'vuex';

import {general} from './general.module';
import {viewAccounts} from './view.accounts.module';
import {product} from './product.module';
// import {data} from './data.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        viewAccounts,
        general,
        product
    }
});
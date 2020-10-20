import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import processor from './processor';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    processor,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

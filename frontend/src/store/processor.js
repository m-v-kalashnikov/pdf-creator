import pdfProcessor from '../api/pdfProcessor';
import { PROCESSING_BEGIN, PROCESSING_SUCCESS, PROCESSING_FAILURE } from './types';

const initialState = {
  loading: false,
  error: false,
  dataResp: null,
};

const actions = {
  pdf({ commit }, { name, word, language }) {
    commit(PROCESSING_BEGIN);
    return pdfProcessor.createPdf(name, word, language)
      .then((response) => {
        commit(PROCESSING_SUCCESS, response);
        return Promise.resolve(response);
      })
      .catch((err) => {
        commit(PROCESSING_FAILURE, err.response.data);
        return Promise.reject();
      });
  },
};

const mutations = {
  [PROCESSING_BEGIN](state) {
    state.loading = true;
    state.error = false;
    state.dataResp = null;
  },
  [PROCESSING_FAILURE](state, response) {
    state.loading = false;
    state.error = true;
    state.data = null;
    state.dataResp = response.data;
  },
  [PROCESSING_SUCCESS](state, response) {
    state.loading = false;
    state.error = false;
    state.dataResp = response.data;
  },
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
};

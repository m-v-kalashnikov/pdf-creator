import session from './session';

export default {
  createPdf(name, word, lang) {
    return session.post('/api/pdf/', { name, word, lang });
  },
};

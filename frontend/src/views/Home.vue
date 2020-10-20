<template>
  <div class="home">
    <b-container>
      <b-row class="mt-3">
        <b-col>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Word:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.word"
                type="text"
                required
                placeholder="Enter word"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Language:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="form.language"
                :options="languages"
                required
              ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary" class="m-3">Submit</b-button>
            <b-button type="reset" variant="danger" class="m-3">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row v-if="dataResp">
        <b-col>
          <b-button @click="downloadRDF" block variant="success">Download generated PDF</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import constants from '@/constants';
import { mapState } from 'vuex';
import JsPDF from 'jspdf';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        word: '',
        name: '',
        language: null,
      },
      languages: constants.data().languages,
      show: true,
    };
  },
  computed: {
    ...mapState('processor', ['dataResp']),
  },
  methods: {
    downloadRDF() {
      const doc = new JsPDF();

      doc.text(`${this.dataResp.data.name} ${this.dataResp.data.word}`, 15, 15);
      doc.save('name_word.pdf');
    },
    pdfProcessor({ word, name, language }) {
      this.$store
        .dispatch('processor/pdf', { word, name, language });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.pdfProcessor(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.word = '';
      this.form.name = '';
      this.form.language = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

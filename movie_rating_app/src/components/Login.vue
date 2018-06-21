<template>
  <div>
    <div class="login">
      <a class="btn facebook" href="/login/facebook">LOGIN WITH FACEBOOK</a>
      <a class="btn twitter" href="/login/twitter">LOGIN WITH TWITTER</a>
    </div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        id="email"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        required
        id="password"
      ></v-text-field>
      <v-btn
        @click="submit"
        :disabled="!valid"
        id="login"
      >
        submit
      </v-btn>
      <v-btn @click="clear" id="clear_input">clear</v-btn>
    </v-form>
  </div>

</template>

<script>
import axios from 'axios';
import bus from './../bus';

export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /\S+@\.\S+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    async submit() {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
        },
        url: '/users/login',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          // window.localStorage.setItem('auth', response.data.token);
          bus.$emit('refreshUser');
          this.$swal('Greate!', 'You are ready to start!', 'success');
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal('Oh oo!', `${message}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="css">
</style>

Vue.component('tweet-button', {
  template: '<a class="button is-outlined is-light" v-on:click="tweet"><span class="icon"><i class="fab fa-twitter"></i></span><span>Tweet</span></a>',
  methods: {
    tweet: function () {
      let caption = 'check this out!';
      let addrress = `https://twitter.com/intent/tweet?text=${caption}`;
      window.location = addrress;
    },
  },
});

Vue.component('name-field', {
  data() {
    return {
      inputVal: this.value,
    };
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val);
    },
  },
  props: ['value'],
  template: `
  <div class="field">
    <p class="control has-icons-left has-icons-right">
      <input class="input is-small" name="name" type="text" placeholder="Full Name" v-model="inputVal">
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>
      <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </p>
  </div>
  `,
});

Vue.component('email-field', {
  data() {
    return {
      inputVal: this.value,
    };
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val);
    },
  },
  props: ['value'],
  template: `
  <div class="field">
    <p class="control has-icons-left has-icons-right">
      <input class="input is-small" name="email" type="text" placeholder="Email" v-model="inputVal">
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>
      <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </p>
  </div>
  `,
});

Vue.component('password-field', {
  data() {
    return {
      inputVal: this.value,
    };
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val);
    },
  },
  props: ['value'],
  template: `
  <div class="field">
    <p class="control has-icons-left">
      <input class="input is-small" name="password" type="password" placeholder="Password" v-model="inputVal">
      <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
      </span>
    </p>
  </div>
  `,
});

var vm = new Vue({
  el: '#app',
  data: {
    isLoggedIn: false,
  },
  methods: {
    register() {
      console.log(this.registrationName);
      console.log(this.registrationEmail);
      console.log(this.registrationPassword);
    },
  },
});

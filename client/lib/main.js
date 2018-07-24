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

Vue.component('create-todo', {
  data() {
    return {
      inputVal: this.value,
    };
  },
  props: ['value'],
  template: `
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="content has-text-centered">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-small" name="name" type="text" placeholder="Content" v-model="inputVal" required>
            <span class="icon is-small is-left">
              <i class="fas fa-list-ul"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
          <a class="button is-success is-focused" @click="create">Create</a>
          <span>&nbsp;</span>
        </div>
      </div>
    </div>
    <button @click="close" class="modal-close"></button>
  </div>
  `,
  methods: {
    close () {
      this.$emit('close');
    },
    create() {
      this.$emit('create', this.inputVal);
    },
  }
});

Vue.component('todo', {
  props: ['todo'],
  template: `
  <div class="column is-one-third">
    <div class="card">
      <div class="card-content">
        <figure class="">
          <img>
        </figure>
        <p class="title">{{ todo.content }}</p>
        <br>
        <p class="subtitle is-6">Created At: {{ todo.created_at }}</p>
        <p class="subtitle is-6">Updated At: {{ todo.updated_at }}</p>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <a class="button">
            Done
          </a>
        </div>
        <div class="card-footer-item">
          <a class="button">
            Update
          </a>
        </div>
      </footer>
    </div>
  </div>
  `,
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
      <input class="input is-small" name="name" type="text" placeholder="Full Name" v-model="inputVal" required>
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
      <input class="input is-small" name="email" type="text" placeholder="Email" v-model="inputVal" required>
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
    }
  },
  props: ['value'],
  template: `
  <div class="field">
    <p class="control has-icons-left">
      <input class="input is-small" name="password" type="password" placeholder="Password" v-model="inputVal" required>
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
    name: null,
    email: null,
    id: null,
    todos: null,
    modalActive: false,
  },
  created() {
    this.decode();
    this.getToDos();
  },
  methods: {
    register() {
      console.log(this.registrationEmail);
      console.log(this.registrationName);
      console.log(this.registrationPassword);
      axios.post('http://localhost:3000/users/registerWithForm', {
          email: this.registrationEmail,
          name: this.registrationName,
          password: this.registrationPassword,
        })
        .then(() => {
          window.alert('Successfully registered');
          location.reload(true);
        })
        .catch((err) => {
          console.log(err);
          window.alert('Invalid name/email/password');
        });
    },
    decode() {
      if (localStorage.userJwt) {
        axios.get('http://localhost:3000/authentication', {
            'headers': {
              'token': localStorage.userJwt,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.name = response.data.name;
            this.email = response.data.email;
            this.id = response.data._id;
            this.isLoggedIn = true;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('gamasuk');
      }
    },
    login() {
      axios.post('http://localhost:3000/users/login', {
          email: this.loginEmail,
          password: this.loginPassword,
        })
        .then((res) => {
          localStorage.userJwt = res.data;
          window.alert('Successfully logged in');
          location.reload(true);
        })
        .catch(() => {
          window.alert('Invalid name/email/password');
        });
    },
    logout() {
      localStorage.clear();
      location.reload(true);
    },
    getToDos() {
      axios.get('http://localhost:3000/todos/read', {
        'headers': {
          'token': localStorage.userJwt,
        },
      }).then((userToDos) => {
        let processedUserToDos = userToDos.data.map((todo) => {
          let c = new Date(todo.created_at);
          let u = new Date(todo.updated_at)
          return {
            _id: todo._id,
            content: todo.content,
            owner: todo.owner,
            created_at: `${c.getDate()}-${c.getMonth()}-${c.getFullYear()}`,
            updated_at: `${u.getDate()}-${u.getMonth()}-${u.getFullYear()}`,
          }
        });
        console.log(processedUserToDos);
        this.todos = processedUserToDos;
      })
    },
    close() {
      this.modalActive = false;
    },
    open() {
      this.modalActive = true;
    },
    create(e) {
      this.modalActive = false;
      axios.post('http://localhost:3000/todos/create', {
        content: e,
      }, {
        'headers': {
          'token': localStorage.userJwt,
        },
      }).then((userToDos) => {
        this.todos = userToDos.data;
        window.alert('Successfully created a new ToDo');
        location.reload(true);
      })
      .catch((err) => {
        window.alert('something went wrong');
        location.reload(true);
      });
    }
  },
});

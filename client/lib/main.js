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
    close() {
      this.$emit('close');
    },
    create() {
      this.$emit('create', this.inputVal);
    },
  }
});

Vue.component('update-todo', {
  data() {
    return {
      inputVal: '',
    };
  },
  watch: {
    datatodo: function (n, o) {
      this.inputVal = n[0];
    },
  },
  props: ['value', 'datatodo'],
  template: `
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="content has-text-centered">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-small" name="name" type="text" required v-model="inputVal">
            <span class="icon is-small is-left">
              <i class="fas fa-list-ul"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
          <a class="button is-success is-focused" @click="update">Update</a>
          <span>&nbsp;</span>
        </div>
      </div>
    </div>
    <button @click="close" class="modal-close"></button>
  </div>
  `,
  methods: {
    close() {
      this.$emit('close')
    },
    update() {
      this.$emit('update', [this.inputVal, this.datatodo[1]]);
    },
  }
});

Vue.component('remove-todo', {
  props: ['datatodo'],
  template: `
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <div class="modal-card-body">
        <div class="box">
          <div class="card">
            <div class="card-content">
              <p class="title">{{ datatodo[0] }}</p>
              <br>
              <p class="subtitle is-6">Created At: {{ datatodo[1] }}</p>
              <p class="subtitle is-6">Updated At: {{ datatodo[2] }}</p>
            </div>
          </div>
        </div>
      </div>
      <footer class="modal-card-foot">
        <div class="content has-text-centered">
          <a class="button is-danger is-focused" @click="remove" style="margin: 10px">Remove</a>
          <a class="button is-success is-focused" @click="close" style="margin: 10px">I'll rethink about it</a>
          <span>&nbsp;</span>
        </div>
      </footer>
    </div>
  </div>
  `,
  methods: {
    close() {
      this.$emit('close')
    },
    remove() {
      this.$emit('remove', this.datatodo[3]);
    },
  }
});

Vue.component('todo', {
  data() {
    return {
      todoContent: this.todo.content,
      todoId: this.todo._id,
      todoCreatedAt: this.todo.created_at,
      todoUpdatedAt: this.todo.updated_at,
    };
  },
  props: ['todo'],
  template: `
  <div class="column is-one-third">
    <div class="card">
      <div class="card-content">
        <p class="title">{{ todo.content }}</p>
        <br>
        <p class="subtitle is-6">Created At: {{ todo.created_at }}</p>
        <p class="subtitle is-6">Updated At: {{ todo.updated_at }}</p>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <a class="button" @click="done">
            Done
          </a>
        </div>
        <div class="card-footer-item">
          <a class="button" @click="update">
            Update
          </a>
        </div>
        <div class="card-footer-item">
          <a class="button" @click="remove">
            Remove
          </a>
        </div>
      </footer>
    </div>
  </div>
  `,
  methods: {
    update() {
      this.$emit('update', [this.todoContent, this.todoId])
    },
    remove() {
      this.$emit('remove', [this.todoContent, this.todoCreatedAt, this.todoUpdatedAt, this.todoId])
    },
    done() {
      this.$emit('done', [this.todoContent, this.todoId])
    },
  }
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
    createModalActive: false,
    updateModalActive: false,
    updateModalData: null,
    removeModalActive: false,
    removeModalData: null,
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
      axios.get('http://localhost:3000/todos/', {
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
      this.createModalActive = false;
      this.updateModalActive = false;
      this.removeModalActive = false;
    },
    openRemove(e) {
      this.removeModalData = e;
      this.removeModalActive = true;
    },
    openCreate() {
      this.createModalActive = true;
    },
    openUpdate(e) {
      console.log('---', e);
      this.updateModalData = e;
      this.updateModalActive = true;
    },
    create(e) {
      this.createModalActive = false;
      axios.post('http://localhost:3000/todos', {
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
    },
    update(e) {
      axios.put(`http://localhost:3000/todos/${e[1]}`, {
          content: e[0],
        }, {
          'headers': {
            'token': localStorage.userJwt,
          },
        }).then((userToDos) => {
          this.todos = userToDos.data;
          window.alert('Successfully updated ToDo');
          location.reload(true);
        })
        .catch((err) => {
          window.alert('something went wrong');
          location.reload(true);
        });
    },
    remove(e) {
      console.log(e);
      axios.delete(`http://localhost:3000/todos/${e}`, {
          'headers': {
            'token': localStorage.userJwt,
          },
        }).then((userToDos) => {
          window.alert('Successfully deleted ToDo');
          location.reload(true);
        })
        .catch((err) => {
          console.log(err);
          window.alert('something went wrong');
          location.reload(true);
        });
    },
    done(e) {
      let title = e[0];
      axios.delete(`http://localhost:3000/todos/${e[1]}`, {
          'headers': {
            'token': localStorage.userJwt,
          },
        }).then((userToDos) => {
          window.alert(`Congratulations for completing ${title}`);
          location.reload(true);
        })
        .catch((err) => {
          console.log(err);
          window.alert('something went wrong');
          location.reload(true);
        });
    }
  },
});

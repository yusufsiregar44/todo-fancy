document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});



var vm = new Vue({
  el: '#app',
  data: {

  },
  methods: {
    tweet() {
      let caption = 'justaratherfancyToDo is fancy indeed, check it out!';
      let addrress = `https://twitter.com/intent/tweet?text=${caption}`;
      window.location = addrress;
    },
  },
});

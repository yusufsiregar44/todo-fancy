// if (localStorage.userJwt) {
//   axios.get('http://localhost:3000/authentication', {
//       'headers': {
//         'token': localStorage.userJwt,
//       },
//     })
//     .then((response) => {
//       let name = response.data.name;
//       let email = response.data.email;
//       let _id = response.data._id;
//
//       const client = new KeenTracking({
//         projectId: '5b573133c9e77c000175c9de',
//         writeKey: '9E7AAED4F5EA9CECD1C342CE804F92CE85B083E6F91742EA0BCCF0C9FCC820CF8F083AF98F9BDA336CE25B5F26783148AF2714C7391F1E920EC5E44047DF2302ACD211EF8E636E527C42D8B4D75DB3C2CD02AA46112AC28784469259EE68B77F'
//       });
//       const helpers = KeenTracking.helpers;
//       const timer = KeenTracking.utils.timer();
//       timer.start();
//
//       KeenTracking.listenTo({
//         '"#create-todo"': (e) => {
//           return client.recordEvent('create', {
//             id: _id
//           });
//         },
//         '#done-todo': (e) => {
//           return client.recordEvent('done', {
//           id: _id
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// } else {
//   console.log('gamasuk');
// }

// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Initiate Google auth
// router.get('/google', passport.authenticate('google', { 
//   scope: ['profile', 'email'],
//   prompt: 'select_account',
//   callbackURL: "http://localhost:5000/auth/google/callback"
// }));

// // Google auth callback
// router.get('/google/callback', 
//   passport.authenticate('google', { 
//     failureRedirect: `${process.env.CLIENT_URL}/login`,
//     session: true 
//   }),
//   (req, res) => {
//     // Successful authentication, redirect to client
//     res.redirect(`${process.env.CLIENT_URL}/products`);
//   }
// );

// // Logout route
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });

// module.exports = router;

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', (req, res, next) => {
  console.log("Initiating Google auth with scope:", ['profile', 'email']);
  next();
}, passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    failureMessage: true 
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;

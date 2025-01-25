// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/user.model.js';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/auth/google/callback',
//       scope: ['profile', 'email']
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if user exists
//         let user = await User.findOne({ where: { email: profile.emails[0].value } });

//         if (!user) {
//           // Create new user if doesn't exist
//           user = await User.create({
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             // Generate a random password since we're using Google auth
//             password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
//           });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// export default passport;
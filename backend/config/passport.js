import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Helper function to handle social login
const handleSocialLogin = async (provider, profile, done) => {
    try {
        const { id, displayName, emails, photos } = profile;
        const email = emails && emails[0] ? emails[0].value : null;
        const photo = photos && photos[0] ? photos[0].value : null;

        if (!email) {
            return done(new Error(`No email found from ${provider}`), null);
        }

        // Check if user exists by email
        let user = await User.findOne({ email });

        if (user) {
            // If user exists, link the social account if not linked
            if (!user[`${provider}Id`]) {
                user[`${provider}Id`] = id;
                if (!user.avatar) user.avatar = photo; // Update avatar if missing
                await user.save();
            }
            return done(null, user);
        }

        // Create new user
        const newUser = new User({
            full_name: displayName,
            email: email,
            [`${provider}Id`]: id,
            avatar: photo,
        });

        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
};

// Google Strategy
if (googleClientId && googleClientSecret) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: googleClientId,
                clientSecret: googleClientSecret,
                callbackURL: '/api/auth/google/callback',
            },
            (accessToken, refreshToken, profile, done) => {
                handleSocialLogin('google', profile, done);
            }
        )
    );
}

// Serialize/Deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;

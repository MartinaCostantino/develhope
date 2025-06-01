import * as dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import passportJWT from 'passport-jwt';
import db from '../db'
import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const { SECRET } = process.env;
const app = express();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: SECRET, 
    },
    async (payload, done) => {
      try {
        
        const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [payload.id]);

        if (user) {
         
          return done(null, user);
        } else {
          
          return done(null, false);
        }
      } catch (error) {
        
        return done(error, false);
      }
    }
  )
);


const authorize = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  })(req, res, next);
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    res.json({ msg: 'Signup successful. Now you can log in.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Signup failed.', details: err.message });
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (!user) return res.status(401).json({ error: 'User not found.' });

    if (password !== user.password) return res.status(401).json({ error: 'Incorrect password.' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });

  
    await db.none('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);

    res.json({ token, id: user.id, username: user.username });
  } catch (err: any) {
    res.status(500).json({ error: 'Login failed.', details: err.message });
  }
};

const logout = async (req, res) => {
  try {
    await db.none('UPDATE users SET token = NULL WHERE id = $1', [req.user.id]);
    res.json({ msg: 'Logout successful.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Logout failed.', details: err.message });
  }
};


export {register, login, authorize, logout};
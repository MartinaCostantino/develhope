const morgan = require('morgan');
import  "express-async-errors"
import express from 'express';
import { getAll, getOneById, create, updateById, deleteById, createImage } from './controllers/planets';
import joi from 'joi';
import multer from 'multer';
import { register, login, authorize, logout } from './controllers/passport';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
})
const upload = multer({storage}) 
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));


app.get('/planets', getAll);

app.get('/planets/:id', getOneById);

app.post('/planets', create );

app.put('/planets/:id', updateById )

app.delete('/planets/:id', deleteById)

app.post('/planets/upload/:id/image',upload.single("image") ,createImage)

app.post('/signup', register)

app.post('/login', login)

app.get('/logout', authorize, logout);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
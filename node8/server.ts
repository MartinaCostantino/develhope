const morgan = require('morgan');
import  "express-async-errors"
import express from 'express';
import { getAll, getOneById, create, updateById, deleteById } from './controllers/planets';
import joi from 'joi';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));


app.get('/planets', getAll);

app.get('/planets/:id', getOneById);

app.post('/planets', create );

app.put('/planets/:id', updateById )

app.delete('/planets/:id', deleteById)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from 'express';
import morgan from 'morgan';
import  "express-async-errors"


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: 'Earth' },
  { id: 2, name: 'Mars' },
];

app.get('/planets', (req, res) => {
  res.status(200).json({ planets });
  
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
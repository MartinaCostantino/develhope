import morgan from 'morgan';
import  "express-async-errors"
import express, { Request, Response } from 'express';
import joi from 'joi';


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

const planetSchema = joi.object({
   id: joi.number().integer().required(),
   name: joi.string().required(),
  
  
})

app.get('/planets', (req, res) => {
  res.status(200).json({ planets });

});

app.get('/planets/:id', (req: Request, res: Response ) => {
  const {id} = req.params;
  const planet = planets.find((planet) => planet.id === Number(id));
  if (!planet) {
    return res.status(404).json({ message: 'Planet not found' })
    }  ;
  return res.status(200).json({ planet });
});

app.post('/planets', (req: Request, res: Response) => {
  const {name, id} = req.body;
  const planet = { id, name };
   const validatetePlanet = planetSchema.validate(planet);
   if (validatetePlanet.error) {
    return res.status(400).json({ message: validatetePlanet.error.details[0].message });
   }else {
   planets.push(planet);
   res.status(201).json({ planet });
}
});

app.put('/planets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const planetIndex = planets.findIndex((planet) => planet.id === Number(id));
  if (planetIndex === -1) {
    return res.status(404).json({ message: 'Planet not found' });
  }
  planets[planetIndex].name = name;
  res.status(200).json({ message: 'Planet updated successfully' });

})

app.delete('/planets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));
  return res.status(200).json({ message: 'Planet deleted successfully' });
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
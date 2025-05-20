import express, { Request, Response } from 'express';
import joi from 'joi';

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

const getAll =  (req: Request, res: Response ) => {
  res.status(200).json({ planets });
};

const getOneById =(req: Request, res: Response ) => {
  const {id} = req.params;
  const planet = planets.find((planet) => planet.id === Number(id));
  if (!planet) {
    return res.status(404).json({ message: 'Planet not found' })
    }  ;
  return res.status(200).json({ planet });
}

const create = (req: Request, res: Response) => {
  const {name, id} = req.body;
  const planet: Planet = { id, name };
   const validatetePlanet = planetSchema.validate(planet);
   if (validatetePlanet.error) {
    return res.status(400).json({ message: validatetePlanet.error.details[0].message });
   }else {
    planets = [...planets, planet]
   res.status(201).json({ planet });
}
}
const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const { error, value } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const planetExists = planets.some(p => p.id === Number(id));
  if (!planetExists) {
    return res.status(404).json({ message: 'Planet not found' });
  }
   planets = planets.map(p =>
    p.id === Number(id) ? { ...p, name: value.name } : p
  );
  res.status(200).json({ message: 'Planet updated successfully' });

}
const deleteById =  (req: Request, res: Response) => {
  const { id } = req.params;
  const planetExists = planets.find(p => p.id === Number(id));
  if (!planetExists) {
   return res.status(404).json({ message: 'Planet not found' });
 }
  planets = planets.filter((planet) => planet.id !== Number(id));
  return res.status(200).json({ message: 'Planet deleted successfully' });
}

export { getAll, getOneById, create, updateById, deleteById } 
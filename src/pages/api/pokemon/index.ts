import { NextApiRequest, NextApiResponse } from 'next';

const pokemonData = {
  name: 'Pikachu',
  types: 'Electric',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log(pokemonData);
    res.status(200).json(pokemonData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

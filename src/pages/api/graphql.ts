import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '../../../server/ApolloServer/ApolloServer';
type Data = {
  name: string
}

export default handler;

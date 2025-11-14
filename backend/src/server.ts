
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { createNote, getAllNotes } from './noteController';
import dotenv from 'dotenv';
import MongoConnection from './db';
import fastifyCors from '@fastify/cors';
dotenv.config();


export const app = fastify()

app.register(fastifyCors, {
    origin: [
        "http://localhost:5173",
        "https://benjamins-burk.vercel.app"
    ],

})

const start = async () => {
try {    await MongoConnection.getDbClient();
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    app.post('/note', createNote)
    app.get('/notes', getAllNotes)
    app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        return {hello: 'world'}
    })

    await app.listen({port: PORT})
    console.log(`Server is listening at port ${PORT}`)
} catch( err){
    console.error("failed to start server: ", err)
    process.exit(1);
}
}

setInterval(
  async () => {
    try {
      const res = await fetch("https://bday-jar.onrender.com");
      console.log(`Self ping OK: ${res.status}`);
    } catch (error) {
      console.error("Could not self ping:", error);
    }
  },
  14 * 60 * 1000
);

start()
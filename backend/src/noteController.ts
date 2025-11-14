import { FastifyReply, FastifyRequest } from "fastify";
import { Note, NoteDatabaseModel } from "./types";
import MongoConnection from "./db";

export async function createNote(
  req: FastifyRequest<{ Body: Note }>,
  reply: FastifyReply
) {
  try {
    const { text } = req.body;
    const newNote: NoteDatabaseModel = {
      _id: crypto.randomUUID(),
      text: text,
      created_at: new Date().toISOString(),
    };
    MongoConnection.noteCollection().insertOne({
      _id: newNote._id,
      text: newNote.text,
      created_at: newNote.created_at,
    });
    reply.status(201).send({ message: "note created", note: newNote });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creating note: ", err);
      reply.status(500).send({ message: "error creating note", error: err });
    }
  }
}
export async function getAllNotes(req:FastifyRequest, reply: FastifyReply) {
  try {
   const res = await MongoConnection.noteCollection().find().toArray()
   reply.status(200).send({message: "notes fetched", notes: res})
  } catch(err) {
    if(err instanceof Error){
      console.error("Failed to fetch from db: ", err)
      return reply.status(500).send({message: "Failed to fetch from db: ", error: err})
    }
  }
}
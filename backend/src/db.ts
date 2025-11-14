import { MongoClient } from "mongodb";
import { NoteDatabaseModel } from "./types";

class MongoConnection {
    private static dbClient: MongoClient
    
    private constructor() {}
    static async getDbClient(): Promise<MongoClient> {
 
        if(!this.dbClient){
            if(!process.env.MONGO_URL){
                console.error("DB URL missing")
                throw new Error("DB URL missing")
            }
            this.dbClient = new MongoClient(`${process.env.MONGO_URL}`)
            await this.dbClient.connect()
            console.log("DB running")

        }
        return this.dbClient
    }
    static noteCollection() {
        return this.dbClient.db().collection<NoteDatabaseModel>('notes');
    }

}
export default MongoConnection
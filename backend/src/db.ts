import { MongoClient } from "mongodb";
import { NoteDatabaseModel } from "./types";

class MongoConnection {
    private static dbClient: MongoClient
    
    private constructor() {}
    static async getDbClient(): Promise<MongoClient> {
        console.log(process.env.MONGO_URL)
        if(!this.dbClient){
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
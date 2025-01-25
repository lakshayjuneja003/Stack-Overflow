import {IndexType, Permission} from "node-appwrite"

import { db , questionCollection} from "../name"
import { databases } from "./config"

export default async function createQuestionCollection() {
    try {
        // creating collection
        await databases.createCollection(db , questionCollection , questionCollection , [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.delete("users"),
            Permission.update("users")
        ])
        console.log("Question Collection Is Created");

        // creating attributes
        await Promise.all([
            databases.createStringAttribute(db , questionCollection , "title" , 100 , true ),
            databases.createStringAttribute(db , questionCollection , "content" , 10000 , true ),
            databases.createStringAttribute(db , questionCollection , "authorId" , 50 , true ),
            databases.createStringAttribute(db , questionCollection , "tags" , 50 , true , undefined , true),
            databases.createStringAttribute(db , questionCollection , "attachmentId" , 50 , false ),
        ]);
        console.log("Question Attributes Are Created");

        // creating indexes
        await Promise.all([
            databases.createIndex(db ,
                questionCollection ,
                "title" , 
                IndexType.Fulltext,
                ["title"],
                ["asc"]
            ),
            databases.createIndex(db ,
                questionCollection ,
                "title" , 
                IndexType.Fulltext,
                ["content"],
                ["asc"]
            ),
        ])
    } catch (error) {
        console.log(error)
    }
}
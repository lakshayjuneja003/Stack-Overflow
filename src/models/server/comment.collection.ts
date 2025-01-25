import { Permission } from "appwrite";
import { commentCollection , db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    try {
        await databases.createCollection(db , commentCollection ,commentCollection , [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.delete("users"),
            Permission.update("users")
        ])
        console.log("Comment Collection Is Created");

        // creating attributes
        await Promise.all([
            databases.createStringAttribute(db , commentCollection , "content" , 10000, true),
            databases.createEnumAttribute(db , commentCollection , "type" , ["answer" , "question"] , true),
            databases.createStringAttribute(db , commentCollection , "typeId" , 50 , true),
            databases.createStringAttribute(db , commentCollection , "authorId" , 50 , true)
        ])
        console.log("Comment Attributes Are Created");
    } catch (error) {
        console.log("Error Creating Comment Collection" , error);
    }
}
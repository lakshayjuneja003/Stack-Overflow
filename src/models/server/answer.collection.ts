import { Permission } from "appwrite";
import { answerCollection , db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
    try {
        await databases.createCollection(db , answerCollection ,answerCollection , [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.delete("users"),
            Permission.update("users")
        ])
        console.log("Answer Collection Is Created");

        // creating attributes
        await Promise.all([
            databases.createStringAttribute(db , answerCollection , "content" , 10000, true),
            databases.createStringAttribute(db , answerCollection , "authorId" , 50 , true),
            databases.createStringAttribute(db , answerCollection , "questionId" , 50 , true)
        ])
        console.log("Answer Attributes Are Created");
    } catch (error) {
        console.log("Error Creating Answer Collection" , error);
    }
}
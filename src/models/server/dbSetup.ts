import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createQuestionCollection from "./question.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log("Database Connected");
    } catch (error) {
        try {
            await databases.create(db , db);
            console.log("Database Created");
            await Promise.all([
                createAnswerCollection(),
                createQuestionCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])
            console.log("Collections Created Successfully");
            console.log("Database Connected");
        } catch (error) {
            console.log("Error Creating Database or collections" , error);
        }
    }

    return databases;
}
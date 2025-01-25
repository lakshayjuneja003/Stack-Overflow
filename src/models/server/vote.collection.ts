import { Permission } from "appwrite";
import { voteCollection , db } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    try {
        await databases.createCollection(db , voteCollection , voteCollection , [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.delete("users"),
            Permission.update("users")
        ])

        console.log("Vote Collection Is Created");

        // creating attributes
        await Promise.all([
            databases.createEnumAttribute(db , voteCollection , "type" , ["question", "answer"] , true),
            databases.createStringAttribute(db , voteCollection , "typeId" , 50 , true),
            databases.createEnumAttribute(
                db,  
                voteCollection ,
                "voteStatus" ,
                ["upvoted" , "downvoted"] ,
                true
             ),
             databases.createStringAttribute(db , voteCollection , "votedById" , 50 , true),
        ])
        console.log("Vote Attributes Are Created");
    } catch (error) {
        console.log("Error Creating Vote Collection" , error);
        
    }
}
import { Permission } from "appwrite";
import { questionAttachmentBucket , db } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log(" Bucket Is Connected");
    } catch (error) {
        try {
            await storage.createBucket(
                questionAttachmentBucket, 
                questionAttachmentBucket , 
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.write("users"),
                    Permission.delete("users"),
                    Permission.update("users")
                ],
                false,
                undefined,
                undefined,
                ["jpeg" , "png" , "gif" , "jpg" , "webp" , "heic"]
            );

            console.log("Stoarge Bucket Is Created");
            console.log("Stroage Bucket Is Connected");
        } catch (error) {
            console.log("Error Creating Bucket" , error);
            
        }
    }
}
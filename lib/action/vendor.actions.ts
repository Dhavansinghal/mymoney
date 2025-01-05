'use server';

import { ID,Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_VENDOR_COLLECTION_ID: VENDOR_COLLECTION_ID,

  } = process.env;

export const getVendorInfobyId = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();
        
        const user = await database.listDocuments(
            DATABASE_ID!,
            VENDOR_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )

        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log("getUserInfo", error)
    }
}

export const getVendors = async ({userId}:getBanksProps) => {
    try {
        const { database } = await createAdminClient();
        const vendors = await database.listDocuments(
            DATABASE_ID!,
            VENDOR_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )

        return parseStringify(vendors.documents);
    }
    catch (error) {
        console.error(error);
    }
}

export const addVendor = async ({  ...userData }: AddVendorParams)=>{
    const { username, usercode, mobilenumber, userId } = userData;

    try{
        const {  database } = await createAdminClient();

        const currentDate = new Date().toISOString();

        const newUserData = {
            username: username,
            usercode: usercode,
            mobilenumber: mobilenumber,
            userId:userId,
            CreatedDate:currentDate
        }

        const newUser = await database.createDocument(
            DATABASE_ID!,
            VENDOR_COLLECTION_ID!,
            ID.unique(),
            {
              ...newUserData
            }
        )

        return parseStringify(newUser);

    }
    catch(error){
        console.error(error);
    }
}


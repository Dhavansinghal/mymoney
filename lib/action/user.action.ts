'use server';

import { ID,Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  } = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();
        
        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )

        
        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log("getUserInfo", error)
    }
}

export const signIn = async ({email,password}:signInProps ) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        const user = await getUserInfo({ userId: session.userId }) 

        return parseStringify(user);

    } catch (error) {
        console.log("SignIN Function Issue");
        console.error(error);
    }
};


export const signUp = async ({ password, ...userData }: SignUpParams)=>{
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try{
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
        ID.unique(), 
        email, 
        password, 
        `${firstName} ${lastName}`);
        
        if(!newUserAccount) throw new Error("Failed to create new user account");

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
              ...userData,
              userId: newUserAccount.$id
            }
        )

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });
        
        return parseStringify(newUser);

    }
    catch(error){
        console.error(error);
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id})

        return parseStringify(user);

    } catch (error) {

        console.log("No Logged In user : getLoggedInUser | user.action.ts file");
        return null;
    }
}

export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();

      cookies().delete("appwrite-session");
      await account.deleteSession("current");

    } catch (error) {
        return null;
    }
}
  
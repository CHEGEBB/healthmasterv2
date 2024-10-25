import { Client } from "appwrite";

export const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_URL!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  appoinmentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENTS_COLLECTION_ID!,
  medicationCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MEDICATIONS_COLLECTION_ID!,
  remindersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_REMINDERS_COLLECTION_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
  avatarId : process.env.NEXT_PUBLIC_APPWRITE_AVATAR_ID!,
};

export const appwriteClient = new Client().setEndpoint(config.endpoint).setProject(config.projectId)
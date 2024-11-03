import { Client } from "appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.health-master.healthmaster",
  projectId: "6704d37c003c8a2f6a36",
  databaseId: "670a2468000caae299eb",
  userCollectionId: "670a248800049761218e",
  appoinmentsCollectionId: "670a254100339e546aa4",
  medicationCollectionId: "670a256a00336a73c6d3",
  remindersCollectionId: "670a259c000d92ef0f0a",
  doctorsCollectionId: "",
  storageId: "670a2a300017fdaee701",
  avatarId : "670b98c80004f12b1c7e"
};

export const appwriteClient = new Client().setEndpoint(config.endpoint).setProject(config.projectId)
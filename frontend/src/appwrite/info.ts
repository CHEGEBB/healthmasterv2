import { Databases, Storage, ID } from 'appwrite';
import { config, appwriteClient } from './conf';
import appwriteAuth from './auth';

const databases = new Databases(appwriteClient);
const storage = new Storage(appwriteClient)

class AppwriteInfo {
  async getPersonalInfo() {
    try {
      const user = await appwriteAuth.getCurrentUser();
      const data = await databases.getDocument(
        config.databaseId,
        config.userCollectionId,
        user?.$id || '',
      );
      data.identificationDocument = data.identificationDocument ? storage.getFileView(config.storageId ,data.identificationDocument) : ''
      return data;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }
  async getMedicalInfo() {
    try {
      const user = await appwriteAuth.getCurrentUser();
      const data = await databases.getDocument(
        config.databaseId,
        config.medicationCollectionId,
        user?.$id || '',
      );
      return data;
    } catch (error: any) {
      if (error.type = 'document_not_found') {
        const user = await appwriteAuth.getCurrentUser();
        await databases.createDocument(
          config.databaseId,
          config.medicationCollectionId,
          user?.$id || '',
          {},
        );
        return {}
      }
      console.error('Error getting user info:', error);
      throw error;
    }
  }

  async updateIdentification({
    identificationType,
    identificationNumber,
    document
  }:{
    identificationType: string;
    identificationNumber: string;
    document: File | null;
  }){
    try {
    const user = await appwriteAuth.getCurrentUser();
    const fileId = document ? (await storage.createFile(config.storageId, ID.unique(), document)).$id : null
    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      user?.$id || '',
      {
        identificationType,
        identificationNumber,
        identificationDocument: fileId
      },
    );
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
  }
  async updatePersonalInfo({
    name,
    email,
    phone,
    dateofbirth,
    gender,
    address,
    occupation,
    emergencyContact,
    emergencyPhone,
  }: {
    name: string;
    email: string;
    phone: string;
    dateofbirth: string;
    gender: string;
    address: string;
    occupation: string;
    emergencyContact: string;
    emergencyPhone: string;
  }) {
    try {
      const user = await appwriteAuth.getCurrentUser();
      await databases.updateDocument(
        config.databaseId,
        config.userCollectionId,
        user?.$id || '',
        {
          username: name,
          email,
          phone,
          dateofbirth,
          gender,
          address,
          occupation,
          emergencyContact,
          emergencyPhone,
        },
      );
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  }
  async updateMedicalInfo({
    primaryPhysician,
    insuranceProvider,
    bloodGroup,
    allergies,
    currentMedications,
    familyMedicalHistory,
    pastMedicalHistory,
  }: {
    primaryPhysician: string | null;
    insuranceProvider: string;
    bloodGroup: string;
    allergies: string;
    currentMedications: string;
    familyMedicalHistory: string;
    pastMedicalHistory: string;
  }) {
    try {
      const user = await appwriteAuth.getCurrentUser();
      await databases.updateDocument(
        config.databaseId,
        config.medicationCollectionId,
        user?.$id || '',
        {
          primaryPhysician,
          insuranceProvider,
          bloodGroup,
          allergies,
          currentMedications,
          familyMedicalHistory,
          pastMedicalHistory,
        },
      );
    } catch (error) {
      console.error('Error updating user medical info:', error);
      throw error;
    }
  }
}

const appwriteInfo = new AppwriteInfo();
export default appwriteInfo;

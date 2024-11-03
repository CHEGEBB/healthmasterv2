import { Databases, ID, Query } from 'appwrite';
import { config, appwriteClient } from './conf';
import appwriteAuth from './auth';

const databases = new Databases(appwriteClient);

class AppwriteAppiontments {
  async getAppointments() {
    try {
      const user = await appwriteAuth.getCurrentUser();
      const data = await databases.listDocuments(
        config.databaseId,
        config.appoinmentsCollectionId,
        [Query.equal('patientId', user?.$id || '')],
      );
      return data.documents;
    } catch (error) {
      console.error('Error getting user appiontments:', error);
      throw error;
    }
  }

  async getMostRecentAppiontment(limit=1) {
    try {
      const user = await appwriteAuth.getCurrentUser();
      const data = await databases.listDocuments(
        config.databaseId,
        config.appoinmentsCollectionId,
        [Query.equal('patientId', user?.$id || ''), Query.orderDesc('$createdAt'), Query.limit(limit)],
      );
      return [...data.documents];
    } catch (error) {
      console.error('Error getting user appiontments:', error);
      throw error;
    }
  }

  async createAppointment({
    date,
    doctorId,
    time,
    reason,
    conditions,
    medications,
  }:{
    doctorId: string;
    date: string;
    time: string;
    reason: string;
    conditions: string;
    medications: string;
  }){
    try {
      const user = await appwriteAuth.getCurrentUser();
      const newDoc = await databases.createDocument(
        config.databaseId,
        config.appoinmentsCollectionId,
        ID.unique(),
        {
          doctorId,
          patientId: user?.$id,
          date,
          time,
          reason,
          conditions,
          medications,
        }
      );
      return newDoc;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async updateAppointment({
    id,
    date,
    doctorId,
    time,
    reason,
    conditions,
    medications,
  }:{
    id: string;
    doctorId: string;
    date: string;
    time: string;
    reason: string;
    conditions: string;
    medications: string;
  }){
    try {
      const user = await appwriteAuth.getCurrentUser();
      const newDoc = await databases.updateDocument(
        config.databaseId,
        config.appoinmentsCollectionId,
        id,
        {
          doctorId,
          patientId: user?.$id,
          date,
          time,
          reason,
          conditions,
          medications,
        }
      );
      return newDoc;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async deleteAppointment(id: string){
    try {
      await databases.deleteDocument(
        config.databaseId,
        config.appoinmentsCollectionId,
        id,
      );
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }
}

export default new AppwriteAppiontments();
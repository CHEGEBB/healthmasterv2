import { Databases, ID } from 'appwrite';
import { config, appwriteClient } from './conf';

export const doctors = new Databases(appwriteClient);

class AppwriteDoctors {
  async getDoctors() {
    try {
      const data = await doctors.listDocuments(
        config.databaseId,
        config.doctorsCollectionId,
      );
      return data.documents;
    } catch (error) {
      console.error('Error getting doctors:', error);
      throw error;
    }
  }

  async getDoctorById(doctorId: string) {
    try {
      const data = await doctors.getDocument(
        config.databaseId,
        config.doctorsCollectionId,
        doctorId,
      );
      return data;
    } catch (error) {
      console.error('Error getting doctor:', error);
      throw error;
    }
  }
}

export default new AppwriteDoctors();
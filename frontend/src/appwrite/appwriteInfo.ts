import { Databases } from 'appwrite';
import { config, appwriteClient } from './conf';
import appwriteAuth from './appwriteAuth'

const databases = new Databases(appwriteClient);

class AppwriteInfo {
  async getInfo() {
    try {
      const user = await appwriteAuth.getCurrentUser()
      const data = await databases.getDocument(config.databaseId, config.userCollectionId, user?.$id || '');
      return data;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }
  async updateInfo({
      name,
      email,
      phone,
      dob,
      gender,
      address,
      occupation,
      emergencyContact,
      emergencyPhone
  }:{
    name: string,
    email: string,
    phone: string,
    dob: string,
    gender: string,
    address: string,
    occupation: string,
    emergencyContact: string,
    emergencyPhone: string
  }) {
    try {
      const user = await appwriteAuth.getCurrentUser()
      await databases.updateDocument(config.databaseId, config.userCollectionId, user?.$id || '', {
        username: name,
        email,
        phone,
        dob,
        gender,
        address,
        occupation,
        emergencyContact,
        emergencyPhone
      });
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  }
}

const appwriteInfo = new AppwriteInfo()
export default appwriteInfo;
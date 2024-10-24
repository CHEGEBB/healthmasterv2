import conf from './conf';
import { Client, Account, ID} from 'appwrite';

const appwwriteClient = new Client()
appwwriteClient.setEndpoint(conf.endpoint).setProject(conf.projectId)
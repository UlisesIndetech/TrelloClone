import { Client, Account, ID, Databases, Storage } from 'appwrite';


const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);


const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);

export { client, storage, account, databases, ID};
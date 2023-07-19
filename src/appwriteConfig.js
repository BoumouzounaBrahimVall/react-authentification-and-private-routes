import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b7af42710799854cf8');

export const account=new Account(client);
export default client;
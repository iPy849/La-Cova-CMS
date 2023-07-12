import { Client } from 'appwrite';

const client = new Client()
  .setEndpoint('http://appwrite-backend.ipydev.xyz/v1')
  .setProject('64a8f09943632a604cea');

export default client;

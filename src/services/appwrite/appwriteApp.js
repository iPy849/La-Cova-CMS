import { Client } from 'appwrite';

const client = new Client()
    .setEndpoint('http://127.0.0.1/v1')
    .setProject('64b4e277656e9df6cc72');

export default client;

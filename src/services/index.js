import database from './appwrite/database';
import auth from './appwrite/auth';

export default {
  ...database,
  ...auth,
};

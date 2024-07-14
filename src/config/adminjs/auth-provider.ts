import { DefaultAuthProvider } from 'adminjs';

import { componentLoader } from './components.js';
import { DEFAULT_ADMIN } from './constants.js';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    if (email === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      return { email };
    }

    return null;
  },
});

export default provider;

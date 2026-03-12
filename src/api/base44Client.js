import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "690a1389568b31dc5bffd62d", 
  requiresAuth: false // Temporarily disable authentication for local development
});

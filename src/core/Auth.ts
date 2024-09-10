import APIRequest from './APIRequest';

export const Auth = {

    /**
     * Get Auth Cookie
     * 
     * @returns {Promise<boolean>} true if successful
     */
    cookie: async () : Promise<boolean> => {
        try {
            await APIRequest.get('/sanctum/csrf-cookie');
            return true;
        }
        
        catch (error : any) {
            // Error Handeling
            console.error('Auth Sync failed: ', error.message);
        }
        
        return false;
    },


    /**
     * Login a user with email and password.
     * 
     * @param email - User's email
     * @param password - User's password
     * @returns User object if successful, otherwise false
     */
    login: async (email: string, password: string) : Promise<boolean|null> => {

        if(!Auth.cookie()) return null;

        try {
            
            // Attempt
            const response = await APIRequest.post('/auth/login',  { email, password });

            // Status Check
            if(response.status != 200) return null;

            // Data
            const data = response.data;

            // Verify token & update localStorage
            if (data.token) {
                // Store token
                localStorage.setItem('api-auth-token', data.token);

                // Store user
                localStorage.setItem('auth-user', JSON.stringify(data.user));

                // Return user instance after login
                return true;
            }

            // Token 404 case
            return false;

        }
        
        // Catch Block
        catch (error: any) {
            console.error('Login failed: ', error.message);
            return false;
        }

    },


    /**
     * Logout the current user.
     * 
     * @returns true if successfully logged out, false if no user is logged in, null on error
     */
    logout: async () => {

        if(!Auth.cookie()) return null;

        try {

            // Get Token
            const token = localStorage.getItem('api-auth-token');

            // Verify Token
            if (!token) {
                return false; // Not logged in
            }

            // Logout Request
            await APIRequest.post('/auth/logout')
            .then(() => {
                // Remove token and user data from localStorage
                localStorage.removeItem('api-auth-token');
                localStorage.removeItem('auth-user');

                return true;
            })
            .catch(error => {
                console.error('Logout failed: ', error.message);
                return null;
            });

        }
        
        catch (error: any) {
            console.error('Logout failed: ', error.message);
            return null;
        }

    },


    /**
     * Check if a user is currently authenticated.
     * 
     * @returns {Promise<boolean|null>} true if authenticated, otherwise false
     */
    check : async (refresh:boolean = false) : Promise<boolean|null> => {

        // Get Token from Local Storage
        const token = localStorage.getItem('api-auth-token');


        // Verify Token Presence
        if(!token){
            return false;
        }

        // If no refresh required
        if(!refresh){
            return true;
        }

        // Refresh cookies
        if(!Auth.cookie()) return null;

        try {

            // Attempt
            const response = await APIRequest.post('/auth/check');
    
            // Verify Status Code
            if(response.status != 200){
                return null;
            }
    
            // Check
            return response.data.authenticated === true;
        }
        
        catch (error : any) {
            // Error Handeling
            console.error('Auth Check failed: ', error.message);
        }

        return null;
    },


    /**
     * Returns user instance (null if 404)
     * 
     * @param refresh get from server
     * @returns {Promise<Object|null>} User object if authenticated & found, otherwise null
     */
    user: async ( refresh:boolean = false) : Promise<Object|null> => {

        // Token
        const token = localStorage.getItem('api-auth-token');

        if(!token){
            return false;
        }

        // If no refresh required
        if(!refresh){
            const user = localStorage.getItem('auth-user');
            return user ? JSON.parse(user) : null;
        }

        try {

            // Attempt
            const response = await APIRequest.post('/auth/check');
    
            // Verify Status Code
            if(response.status != 200){
                return null;
            }

            // Data
            const data = response.data;

            // Store user
            localStorage.setItem('auth-user', JSON.stringify(data.user));

            // Return user instance after login
            return data.user;
        }
        
        catch (error:any) {
            // Error Handeling
            console.error('Auth user request failed: ', error.message);
            
        }

        return null;
    }

};

export default Auth;

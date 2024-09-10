import axios from 'axios';

class APIRequestError extends Error {};

// Axios instance
const api_axios = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true,
});


// 
// Intercepters 
// 

// Add Auth Token
api_axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('api-auth-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const APIRequest = {

    /**
     * Sends a 'GET' request at desired endpoint
     * 
     * @param url API endpoint
     * @param params data to send in request
     * @returns response
     */
    get: async (url: string, params = {}) => {
        try {
            const response = await api_axios.get(url, { params });
            return response;
        } catch (error: any) {
            throw new APIRequestError('API GET request failed: ' + error.message);
        }
    },


    /**
     * Sends a 'POST' request at desired endpoint
     * 
     * @param url API endpoint
     * @param params data to send in request
     * @returns response
     */
    post: async (url: string, data?: Object) => {
        try {
            const response = await api_axios.post(url, data);
            return response;
        } catch (error: any) {
            throw new APIRequestError('API POST request failed: ' + error.message);
        }
    },


    /**
     * Sends a 'PUT' request to the desired endpoint
     * 
     * @param url API endpoint
     * @param data data to send in the request
     * @returns response
     */
    put: async (url: string, data?: Object) => {
        try {
            const response = await api_axios.put(url, data);
            return response;
        } catch (error: any) {
            throw new APIRequestError('API PUT request failed: ' + error.message);
        }
    },


    /**
     * Sends a 'DELETE' request to the desired endpoint
     * 
     * @param url API endpoint
     * @param params optional parameters to send in the request
     * @returns response
     */
    delete: async (url: string, params?: Object) => {
        try {
            const response = await api_axios.delete(url, { data: params });
            return response;
        } catch (error: any) {
            throw new APIRequestError('API DELETE request failed: ' + error.message);
        }
    },


    /**
     * Creates a resource object with methods that reflect Laravel's resourceful routes.
     * 
     * @param resource_name The name of the resource, e.g., 'product'
     * @returns object with methods: index, show, store, update, destroy, and describe
     */
    resource: (resource_name: string, pluralize_name : boolean = true) => {

        // Pluralize the resource name (simple rule for 's' and 'es')
        const pluralize = (name : string ) => {
            if (name.endsWith('s')) {
                return name + 'es';
            }
            return name + 's';
        };

        // Pluralize the resource name (if pluralize_name is set true)
        if(pluralize_name){
            resource_name = pluralize(resource_name);
        }

        // Resource Path
        const resource_path = `/${pluralize(resource_name)}`;

        return {
            /**
             * Fetches all resources.
             */
            index: async () => {
                return await api_axios.get(resource_path);
            },

            /**
             * Fetches single resource (by ID)
             * 
             * @param id Resource ID
             */
            show: async (id: number | string) => {
                return await api_axios.get(`${resource_path}/${id}`);
            },

            /**
             * Creates a New
             * 
             * @param data Data to send in request
             */
            store: async (data: Object) => {
                return await api_axios.post(resource_path, data);
            },

            /**
             * Updates existing Resource (by ID)
             * 
             * @param id Resource ID
             * @param data Data to send in request
             */
            update: async (id: number | string, data: Object) => {
                return await api_axios.put(`${resource_path}/${id}`, data);
            },

            /**
             * Deletes an existing resource (by ID)
             * 
             * @param id Resource ID
             */
            destroy: async (id: number | string) => {
                return await api_axios.delete(`${resource_path}/${id}`);
            },

            /**
             * Describes all available routes with complete URLs.
             * 
             * @returns JSON object with routes
             */
            describe: () => ([
                {name: 'index',   method: 'GET',     path:`${api_axios.defaults.baseURL}${resource_path}`     },
                {name: 'show',    method: 'GET',     path:`${api_axios.defaults.baseURL}${resource_path}/{id}`},
                {name: 'store',   method: 'post',    path:`${api_axios.defaults.baseURL}${resource_path}`     },
                {name: 'update',  method: 'PUT',     path:`${api_axios.defaults.baseURL}${resource_path}/{id}`},
                {name: 'destroy', method: 'DELETE',  path:`${api_axios.defaults.baseURL}${resource_path}/{id}`},
            ])
        };
    }
};


export default APIRequest;

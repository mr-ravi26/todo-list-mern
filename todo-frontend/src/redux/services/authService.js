import api_instance from "../../utils/axios";
import { handleResponse } from "../../utils/response";
import { logintype } from "../../utils/constant";


export const userRegistration = async (emailid, password) => {
    try {

        let data = {
            password: password,
            email: emailid,
        }

        const request = await api_instance.post('/api/signup', data);
        const response = handleResponse(request)
        return response;

    } catch (error) {
        throw error;
    }
}

export const login = async (emailid, password) => {
    try {
        let data = {
            password: password,
            email: emailid,
        }
        const request = await api_instance.post('/api/signin', data);
        const response = handleResponse(request)
        console.log(response);
        return response;
    } catch (error) {

        throw error;
    }
}



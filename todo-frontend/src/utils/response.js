export const handleResponse = (response) => {
    if (response.status === 200) {
        const responseData = response.data;
        if (responseData) {
            return responseData;
        } else {
            throw new Error('Response not available from current request');
        }
    }
    else if (response.status === 401) {
        const responseData = response.error;
        if (responseData) {
            return responseData;
        } else {
            throw new Error('Response not available from current request');
        }
    }
    else if (response.status === 422) {
        const responseData = response.error;
        if (responseData) {
            return responseData;
        } else {
            throw new Error('Invalid Request');
        }
    }
    else {
        throw new Error('Invalid Request');
    }
}
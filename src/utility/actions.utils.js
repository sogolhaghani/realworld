export const BASE_DOMAIN = 'https://conduit-api-realworld.herokuapp.com/api/';

export const requestGetOptions = (token) => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
};

export const requestDeleteOptions = (token) => {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
};

export const requestOptions = (method, obj,token) => {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(obj)
    }
};


export const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
               
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

const logout = () => {
   
}

export default handleResponse
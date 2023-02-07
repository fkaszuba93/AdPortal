export const userURL = 'http://localhost:8080/user';

export const registerUser = async (userData, callback) => {
    sendRequest('/register', userData, callback);
};

export const loginUser = async (userData, callback) => {
    sendRequest('/login', userData, callback);
};

const sendRequest = async (url, userData, callback) => {
    const resp = await fetch(userURL + url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    callback(await resp.json());
};

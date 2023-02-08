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
    const token = await resp.json();
    sessionStorage.setItem("userToken", JSON.stringify(token));
    callback(token);
};

export const isUserLoggedIn = () => {
    return sessionStorage.getItem("userToken") !== null;
};

export const getUserToken = () => {
    if (!isUserLoggedIn()){
        return null;
    }
    return JSON.parse(sessionStorage["userToken"]);
};

export const logOut = () => {
    sessionStorage.removeItem("userToken");
};

export const isOwner = (offer) => {
    const userToken = getUserToken();
    return userToken?.userId === offer?.user?.id;
};

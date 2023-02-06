export const userURL = 'http://localhost:8080/user';

export const registerUser = async (userData) => {
    const resp = await fetch(userURL + '/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
};

export const loginUser = async (userData) => {
// TODO
};

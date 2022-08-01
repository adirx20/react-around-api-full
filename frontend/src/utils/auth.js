export const BASE_URL = 'http://localhost:3002';export const register = (email, password) => {
    return fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/users/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .catch((err) => console.log(err));
};

export const getToken = (token) => {
    console.log(token);
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    })
        .then((res) => checkResponse(res))
        .catch((err) => console.log(err));
};

function checkResponse(res) {
    if (res.ok) {
        console.log(res);
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

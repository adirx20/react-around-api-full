const customFetch = (url, headers) =>    fetch(url, headers).then((res) =>
        res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`),
    );

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
    }

    getUserInfo() {
        return customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
    }

    editProfile(userData) {
        return customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: userData.name,
                about: userData.about,
            }),
        });
    }

    editAvatar(url) {
        return customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            }),
        });
    }

    createCard(data) {
        return customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        });
    }

    deleteCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        });
    }

    likeCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT',
        });
    }

    unlikeCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: isLiked ? 'DELETE' : 'PUT',
        });
    }
}

// Regular api (cards api)
// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/group-12",
//   headers: {
//     authorization: "7d25a2aa-7d8e-4eaa-a0f4-d0c8a249fbe0",
//     "Content-Type": "application/json"
//   }
// });

// New api (user api)
const jwt = localStorage.getItem('jwt');

const api = new Api({
    baseUrl: 'http://localhost:3002',
    headers: {
        Accept: 'application/json',
        Origin: 'http://around-express.students.nomoredomainssbs.ru',
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
    },
});
// <=====

export default api;

// Token: 7d25a2aa-7d8e-4eaa-a0f4-d0c8a249fbe0 Group ID: group-12

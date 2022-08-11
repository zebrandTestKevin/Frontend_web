export const tokenLib = {
    removeTokens,
    setTokens,
    getToken,
    getRefrehToken
};

function removeTokens() {
    localStorage.removeItem("token")
    localStorage.removeItem("token_refresh")
}

function setTokens(token, refresh_token) {
    localStorage.setItem("token", token)
    localStorage.setItem("token_refresh", refresh_token)
}

function getToken() {
    return localStorage.getItem("token")
}

function getRefrehToken() {
    return localStorage.getItem("token_refresh")
}
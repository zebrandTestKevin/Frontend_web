import axios from 'axios';
import {apiUrl} from '../config/config';
import {tokenLib} from '../lib/token.lib'

axios.interceptors.request.use(function (config) {
    const token = tokenLib.getToken();
    if (token && config.url != `${apiUrl}oauth/token`) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
}, function (err) {
    return Promise.reject(err);
});
axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    try {
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token_refresh = tokenLib.getRefrehToken()
            const params = new URLSearchParams()
            params.append('refresh_token', token_refresh)
            params.append('grant_type', 'refresh_token')
            tokenLib.removeTokens();
            if (token_refresh != null || token_refresh != undefined) {
                var data = await axios({
                    url: `${apiUrl}oauth/token`,
                    params: params,
                    method: "POST",
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        "Authorization": 'Basic Y292aWQxOXByb3llY3Q6Y292aWQxOXByb3llY3QxMjM0NQ=='
                    },

                });
                if (data.status == 200) {
                    tokenLib.setTokens(data.data.access_token, data.data.refresh_token)
                    return axios(originalRequest);
                } else {
                    location.reload();
                    return Promise.reject(error);
                }
            } else {
                location.reload();
                return Promise.reject(error);
            }

        } else if (originalRequest._retry) {
            tokenLib.removeTokens();
            location.reload();
            return Promise.reject(error);

        }
        return Promise.reject(error);

    } catch (e) {
        return Promise.reject(error);
    }
});
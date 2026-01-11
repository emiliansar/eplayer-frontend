import axios from 'axios'

axios.defaults.withCredentials = true;

class AuthService {
    async register(dto) {
        try {
            const {data} = await axios.post('/api/auth/register', dto);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async signin(dto) {
        const {data} = await axios.post('/api/auth/signin', dto);
        return data;
    }

    async refresh(refresh) {
        console.log("Refresh получил refresh: " + JSON.stringify(refresh))
        try {
            console.log("Refresh запрос начался")
            const {data} = await axios.post('/api/auth/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${refresh}`
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async user(access, refresh, changeAccessToken) {
        try {
            const {data} = await axios.get('/api/user/profile', {
                headers :{
                    'Authorization': `Bearer ${access}`
                }
            });
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.get('/api/auth/profile', {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    return data;
                } catch (refreshError) {
                    console.error("Не удалось обновить токен: ", refreshError)
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async profile(access_token, refresh_token, changeAccessToken) {
        console.log("Profile получил refresh: " + refresh_token)
        try {
            const {data} = await axios.get('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            console.log("Оригинальный запрос: ", data)
            return data;
        } catch (error) {
            console.log("Error.status: " + error.response?.status)
            if (+error.response?.status === 401) {
                console.log("Обновление токена...")

                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);
                    console.log("Новый access токен: " + newToken.token)

                    const {data} = await axios.get('/api/user/profile', {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    console.log("Повторный запрос успешен: ", data)
                    return data;
                } catch (refreshError) {
                    console.error("Не удалось обновить токен: ", refreshError)
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }
}

export const authService = new AuthService()
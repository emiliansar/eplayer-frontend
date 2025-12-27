import axios from 'axios';

axios.defaults.withCredentials = true;

class UserService {
    async refresh(refresh) {
        console.log("Refresh получил refresh: " + JSON.stringify(refresh))
        try {
            console.log("Refresh запрос начался")
            const {data} = await axios.post('/api/auth/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${refresh}`
                }
            });
            console.log("Refresh успешно завершился!")
            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateUserAccount(form, access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.patch('/api/user/patch-acc', form, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.patch('/api/user/patch-acc', form, {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async profile(access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.get('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {

                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.get('/api/user/profile', {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async getHistory(access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.get('/api/user/history', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            console.log("userService get data: ", data)
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.get('/api/user/history', {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    console.log("userService get data: ", data)
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async createPlaylist(
        form,
        access_token,
        refresh_token,
        changeAccessToken,
    ) {
        try {
            const { data } = await axios.post('/api/user/create-playlist', form, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            return data;
        } catch (error) {
            console.log(error)
            if (+error.response?.status === 401
                || +error.status === 401
            ) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const { data } = await axios.post('/api/user/create-playlist', form, {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    })
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async addToPlaylist(
        playlistId,
        userId,
        access_token,
        refresh_token,
        changeAccessToken,
        newItem
    ) {
        console.log("В addToPlaylist playlistId: ", playlistId)
        console.log("В addToPlaylist userId: ", userId)
        console.log("В addToPlaylist newItem: ", newItem)
        try {
            const { data } = await axios.post('/api/user/update-playlist', {
                id: playlistId,
                userId: +userId,
                newItem: newItem
            }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            return data;
        } catch (error) {
            console.log(error)
            if (+error.response?.status === 401
                || +error.status === 401
            ) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const { data } = await axios.post('/api/user/update-playlist', {
                        id: playlistId,
                        userId: +userId,
                        newItem: newItem
                    }, {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    })
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async getPlaylists(access_token) {
        try {
            const {data} = await axios.get('/api/user/user-playlists', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.get('/api/user/user-playlists', {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async getSubscriptions(access_token, refresh_token, changeAccessToken) {
        console.log("getSubscriptions вызван")
        try {
            const {data} = await axios.get('/api/user/get-subs', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            console.log("getSubscriptions получил данные: ", data)
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.get('/api/user/get-subs', {
                        headers: {
                            'Authorization': `Bearer ${newToken.token}`
                        }
                    });
                    return data;
                } catch (refreshError) {
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }
}

export const userService = new UserService();
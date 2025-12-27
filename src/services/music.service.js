import axios from 'axios';

axios.defaults.withCredentials = true;

class MusicService {
    async refresh(refresh) {
        try {
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

    async getMetaData(musicId) {
        try {
            const {data} = await axios.get(`/api/music/meta-data/${musicId}`);
            return data;
        } catch (error) {
            if (error.response?.status === 404) {
                throw error.response?.data;
            }
            throw error;
        }
    }

    async getPlaylistData(id) {
        try {
            const {data} = await axios.get(`/api/music/playlist-data/${id}`);
            return data;
        } catch (error) {
            throw error?.response?.message || error.message;
        }
    }

    async postUpload(form, access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.post('/api/music/upload', form, {
                headers :{
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.post('/api/music/upload', form, {
                        headers :{
                            'Authorization': `Bearer ${newToken.token}`,
                            'Content-Type': 'multipart/form-data'
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

    async postDelete(id, access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.delete(`/api/music/delete/${id}`, {
                headers :{
                    'Authorization': `Bearer ${access_token}`,
                }
            })
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.delete(`/api/music/delete/${id}`, {
                        headers :{
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

    async getAudioOnSub(subList, access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.post('/api/music/get-aos/', { subList }, {
                headers :{
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })
            return data;
        } catch (error) {
            console.log(error)
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.post('/api/music/get-aos/', { subList }, {
                        headers :{
                            'Authorization': `Bearer ${newToken.token}`,
                            'Content-Type': 'application/json'
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

    async getPlaylistsOnSub(subList, access_token, refresh_token, changeAccessToken) {
        try {
            const {data} = await axios.post('/api/music/get-pos/', { subList }, {
                headers :{
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })
            return data;
        } catch (error) {
            if (+error.response?.status === 401) {
                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.token);

                    const {data} = await axios.post('/api/music/get-pos/', {subList}, {
                        headers :{
                            'Authorization': `Bearer ${newToken.token}`,
                            'Content-Type': 'application/json'
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

    async getTakeFromA(takeFrom, target) {
        console.log(`getTakeFromA вызван в ${new Date()}`)
        try {
            const {data} = await axios.post('/api/music/get-from-a', { takeFrom, target }, {
                headers :{
                    'Content-Type': 'application/json'
                }
            })
            console.log(`getTakeFromA закончил в ${new Date()}`)
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getTakeFromP(takeFrom) {
        try {
            const {data} = await axios.post('/api/music/get-from-p', { takeFrom }, {
                headers :{
                    'Content-Type': 'application/json'
                }
            })
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export const musicService = new MusicService();
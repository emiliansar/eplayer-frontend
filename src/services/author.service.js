import axios from 'axios'

axios.defaults.withCredentials = true;

class AuthorService {
    async getAuthor(authorId) {
        console.log(authorId)
        try {
            const {data} = await axios.get(`/api/author/${authorId}`);
            return data;
        } catch (error) {
            throw new Error("Ошибка запроса: ", error);
        }
    }

    async getMusic(authorId) {
        try {
            const { data } = await axios.get(`/api/author/music/${authorId}`);
            return data;
        } catch (error) {
            throw new Error("Ошибка запроса: ", error)
        }
    }

    async getPls(authorId) {
        try {
            const { data } = await axios.get(`/api/author/pls/${authorId}`);
            return data;
        } catch (error) {
            throw new Error("Ошибка запроса: ", error)
        }
    }
}

export const authorService = new AuthorService();
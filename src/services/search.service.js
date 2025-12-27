import axios from 'axios'

axios.defaults.withCredentials = true;

class SearchService {
    async search(text) {
        try {
            const { data } = await axios.get(`/api/search?text=${text}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export const searchService = new SearchService()
import axios from 'axios';   

const URL = "https://pixabay.com/api/";
const API_KEY = "45296804-0fb55f0e1381bd4cbf585a7a5";    // ключ що отримала після реєстрації тут https://pixabay.com/api/docs/#api_search_images

axios.defaults.baseURL = URL;

export async function fetchImages(query, page = 1) {      
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page,                                            
    };

try {
    const response = await axios.get(URL, {params});      
    return response.data;
} catch(error) {
    console.error("Image Search Error:", error);
    throw error;
}
};
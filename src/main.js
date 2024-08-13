import {fetchImages} from './js/pixabay-api.js';
import {
    renderImages,
    clearGallery,
    showLoader,
    hideLoader, 
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const form = document.querySelector(".form-search");
let query = '';
let page = 1;
let maxPages = 0;


form.addEventListener("submit", async event => {
    event.preventDefault();
    query = event.currentTarget.elements.query.value.trim();
    page = 1;

    if(!query) {
        iziToast.error({
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return;
    }

    showLoader();
    clearGallery();                                   
    loadMoreBtn.classList.add('hidden');

    try {
        const data = await fetchImages(query, page);
        maxPages = data.maxpages;

        if(data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
            });
        } else {
            renderImages(data.hits);

        if (data.hits.length < 15 || maxPages <= 15) {
            iziToast.info({
                position: 'topRight',
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
        }
    } catch(error) {
        iziToast.error({ title: 'Error', message: error.message });
    } finally {
        hideLoader();
        form.reset();
    }
});


loadMoreBtn.addEventListener("click", async () => {
    page+=1;
    showLoader();

    try{
        const data = await fetchImages(query, page);
        renderImages(data.hits);

        if (data.hits.length === 0 || page * 15 >= maxPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        } else {
            smoothScroll();
        }
    } catch(error) {
        iziToast.error({ title: 'Error', message: error.message });
    } finally {
        hideLoader();
    }
});

function smoothScroll() {
    const { height: cardHeight } = document
    .querySelector('.gallery-list')
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}


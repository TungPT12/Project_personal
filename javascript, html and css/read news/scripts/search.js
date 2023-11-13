'use strict';
const API_KEY = 'e3e23d873e39482395dd90daa37251e4'
const PAGE_SIZE = 5
const NO_TEXT = 'This text is wrong'

const newContainer = $('#news-container')
const numberPage = $('#page-num');
const searchBtnEl = $('#btn-submit')
const inputQueryEl = $('#input-query')
const previous = $('#btn-prev');
const next = $('#btn-next');
const pageControlEl = $('#nav-page-num');
let pageNumberPresent = 1;
let totalResult = 0;
let searchValue = ''

/**
 * 
 * @param {*} text 
 * @param {*} warning 
 * @returns true if text is not empty | false if text is empty
 */
const isEmptyText = (text, warning = '') => {
    if (text)
        return true
    alert(warning)
    return false;
}

/**
 * fetch data in api
 * @param {*} searchValue 
 * @param {*} page 
 * @returns data in api
 */
const fetchData = async (searchValue, page) => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchValue}&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`);
    const data = await response.json();
    return data;
}

/**
 * render news
 */
const renderCard = (listNews) => {
    const listNewsEl = listNews.map((newInfo) => {
        return `<div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								${newInfo.urlToImage ? `<img src="${newInfo.urlToImage}"
									class="card-img"
									alt="${newInfo.title}"/>` : `<img src="../images/error.jpg"
									class="card-img"
									alt="${newInfo.title}"/>`}
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${newInfo.title}</h5>
									<p class="card-text">${newInfo.description == null ? NO_TEXT : newInfo.description}</p>
									<a href="${newInfo.url}"
										target="_blank"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`
    })
    newContainer.innerHTML = listNewsEl.join('');
}

/**
 * move to previous page
 */
const previousEvent = () => {
    previous.addEventListener('click', async function () {
        pageNumberPresent--;
        const data = await fetchData(searchValue, pageNumberPresent);
        numberPage.innerHTML = pageNumberPresent;
        renderCard(data.articles);
        hiddenButton();
        window.scrollTo(0, 0);
    })
}

/**
 * move to next page
 */
const nextEvent = () => {
    next.addEventListener('click', async function () {
        pageNumberPresent++;
        const data = await fetchData(searchValue, pageNumberPresent);
        numberPage.innerHTML = pageNumberPresent;
        renderCard(data.articles);
        hiddenButton();
        window.scrollTo(0, 0);
    })
}

/**
 * add a class in element
 * @param {*} element 
 * @param {*} attribute 
 */
const addClass = (element, attribute) => {
    element.classList.add(attribute)
}

/**
 * remove a class in element
 * @param {*} element 
 * @param {*} attribute 
 */
const removeClass = (element, attribute) => {
    element.classList.remove(attribute)
}

/**
 * auto hidden previous and next button
 */
const hiddenButton = () => {
    const hiddenAttr = 'hidden';
    if (totalResult > 1 && totalResult <= 5) {
        addClass(next, hiddenAttr)
        addClass(previous, hiddenAttr);
    } else if (pageNumberPresent === 1) {
        addClass(previous, hiddenAttr);
        removeClass(next, hiddenAttr);
    }
    else if (pageNumberPresent > 1 && pageNumberPresent * PAGE_SIZE < totalResult) {
        removeClass(previous, hiddenAttr);
        removeClass(next, hiddenAttr);
    } else {
        removeClass(previous, hiddenAttr);
        addClass(next, hiddenAttr)
    }
}

/**
 * search event
 */
function btnSearchEvent() {
    searchBtnEl.addEventListener("click", async function () {
        pageNumberPresent = 1;
        let isValidation = false;
        isValidation = isEmptyText(inputQueryEl.value.trim(), 'Tell us some thing we will search for you!')
        if (isValidation) {
            searchValue = inputQueryEl.value.trim();
            const data = await fetchData(searchValue, pageNumberPresent);
            totalResult = data.totalResults;
            if (totalResult > 0) {
                hiddenButton();
                renderCard(data.articles)
                removeClass(pageControlEl, 'hidden')
            } else {
                newContainer.innerHTML = 'No result';
                addClass(pageControlEl, 'hidden')
            }
        }
    });
}

/**
 * init all function in search.js
 */
const init = () => {
    btnSearchEvent();
    previousEvent();
    nextEvent();
}

init();
'use strict'
const API_KEY = 'e3e23d873e39482395dd90daa37251e4'
const CATEGORY_KEY = 'categoryKey';
const PAGE_SIZE_KEY = 'PAGE_SIZE';
const CATEGORY = getFromStorage(CATEGORY_KEY, 'General')
const PAGE_SIZE = getFromStorage(PAGE_SIZE_KEY, 5);
const NO_TEXT = 'This text is wrong'

const newContainer = $('#news-container')
const numberPage = $('#page-num');
const previous = $('#btn-prev');
const next = $('#btn-next');
const pageControlEl = $('#nav-page-num');

let pageNumberPresent = 1;
let totalResult = 0;
let isNextHidden = false;
let isPreviousHidden = false;

/**
 * fetch data in api
 * @param {*} category 
 * @param {*} pageSize 
 * @param {*} page 
 * @returns data in api
 */
const fetchData = async (category, pageSize, page) => {
	const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`);
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
		const data = await fetchData(CATEGORY, PAGE_SIZE, pageNumberPresent);
		numberPage.innerHTML = pageNumberPresent;
		renderCard(data.articles);
		hiddenButton();

	})
}

/**
 * move to next page
 */
const nextEvent = () => {
	next.addEventListener('click', async function () {
		pageNumberPresent++;
		const data = await fetchData(CATEGORY, PAGE_SIZE, pageNumberPresent);
		numberPage.innerHTML = pageNumberPresent;
		renderCard(data.articles);
		hiddenButton();

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
	if (pageNumberPresent === 1) {
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
 * init all function in news.js
 */
const init = async () => {
	const data = await fetchData(CATEGORY, PAGE_SIZE, pageNumberPresent);
	totalResult = data.totalResults;
	if (totalResult > 0) {
		renderCard(data.articles);
		previousEvent();
		nextEvent();
		hiddenButton();
		removeClass(pageControlEl, 'hidden')
	} else {
		addClass(pageControlEl, 'hidden')
	}
}

init();
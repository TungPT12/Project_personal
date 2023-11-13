"use strict";

/**
 * 
 * @param {*} selector 
 * @returns element already query
 */
const queryElement = (selector) => {
    return document.querySelector(selector);
};

const navbar = queryElement("#sidebar");
const sidebarTitle = queryElement("#sidebar-title");

/**
 * add or remove active class in sidebar
 */
const activeSideBar = () => {
    sidebarTitle.addEventListener("click", function () {
        navbar.classList.toggle("active");
    })
}

activeSideBar();


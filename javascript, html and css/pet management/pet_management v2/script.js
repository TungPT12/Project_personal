"use strict";

let pets = [];
let healthyPets = [];
let breeds = [];
let isShowHealthyPet = false;
const inputId = $("#input-id");
const inputName = $("#input-name");
const inputAge = $("#input-age");
const selectType = $("#input-type");
const inputWeight = $("#input-weight");
const inputLength = $("#input-length");
const inputColor = $("#input-color-1");
const inputBreed = $("#input-breed");
const inputVaccinated = $("#input-vaccinated");
const inputDewormed = $("#input-dewormed");
const inputSterilized = $("#input-sterilized");
const submitBtn = $("#submit-btn");
const showHealthyPetBtn = $("#healthy-btn");
const showAllPetBtn = $("#showall-btn");
const bmiBtn = $("#bmi-btn");
const tableBodyEl = $("#tbody");
const sidebar = $("#sidebar");
const sidebarTitle = $("#sidebar-title");
// const editLink = $('#click');

// const editLinkEvent = () => {
//     editLink.addEventListener('click', function () {

//         window.location.href = "../page/edit.html"

//     })
// }


const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

/**
 * 
 * @param {*} id to find in list
 * @param {*} list  list for search id
 * @returns position if found value
 */
const findPet = (id, list) => {
    let pos = list.findIndex((pet) => pet.id === id);
    return pos
}

/**
 * 
 * @param {*} numberText text
 * @param {*} alert message user want to show
 * @param {*} type 
 * @returns 
 */
const isNumberAndThanZero = (numberText, warning, type = '') => {
    if (type === 'age') {
        if (!numberText.includes('.')) {
            let number = Number.parseInt(numberText);
            if (number && number > 0) {
                return true;
            }
        }
        alert(alert)
        return false;
    } else {
        let number = Number.parseFloat(numberText);
        if (number && number > 0) {
            return true;
        }
        alert(warning)
        return 0;
    }
}

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
 * 
 * @param {*} id 
 * @param {*} format 
 * @param {*} warning 
 * @returns true if correct format | false if incorrect format
 */
const isIdFormat = (id, format, warning = "") => {
    let pattern = format;
    let isValid = pattern.test(id);
    if (isValid) {
        return true;
    }
    alert(warning);
    return false;
}

/**
 * 
 * @param {*} id 
 * @param {*} warning 
 * @returns true if id is not exist | false if text is exist
 */
const isDuplicateId = (id, warning) => {
    let pos = findPet(id, pets)
    if (pos < 0) {
        return true;
    }
    alert(warning)
    return false;
}

/**
 * First value of dropdown must have value none
 * @param {*} value 
 * @param {*} warning 
 * @returns true if have value different none | false if value is none 
 */
const isSelect = (value, warning) => {
    if (value !== 'none')
        return true;
    alert(warning)
    return false;
}

/**
 * 
 * @param {*} injectionType 
 * @returns '<i class="bi bi-check-circle-fill"></i>' if pet was injection 
 * | <i class="bi bi-x-circle-fill"></i> if pet was not injection 
 */
const isInjection = (injectionType) => {
    if (injectionType)
        return `<i class="bi bi-check-circle-fill"></i>`;
    return `<i class="bi bi-x-circle-fill"></i>`;
}

/**
 * Delete pet in table and list
 * @param {*} id 
 */
const deletePet = (id) => {
    let pos = findPet(id, pets);
    let posHealthy = findPet(id, healthyPets);
    if (pos > -1) {
        let row = $(`#${id}`);
        let isDelete = confirm("Are you sure?");
        if (isDelete) {
            pets.splice(pos, 1);
            saveToStorage("pets", pets);
            healthyPets.splice(posHealthy, 1);
            saveToStorage("healthyPets", healthyPets);
            row.remove();
        }
    } else {
        alert("Something wrong, please try again later!");
    }
};

/**
 * Clear all value in form
 */
const clearForm = () => {
    inputId.value = "";
    inputName.value = "";
    inputAge.value = "";
    selectType.value = 'Select Type';
    inputWeight.value = "";
    inputLength.value = "";
    inputColor.value = "#000000";
    inputBreed.innerHTML = `<option value="none">Select Breed</option>`;
    inputBreed.value = 'none';
    inputVaccinated.checked = false;
    inputDewormed.checked = false;
    inputSterilized.checked = false;
};

/**
 * Clear data in table
 */
const clearTableData = () => {
    tableBodyEl.innerHTML = ''
}

/**
 * 
 * @param {*} petList a list have object has bmi property
 * @returns return new list was calculate bmi
 */
const calculateBMIInPetList = (petList) => {
    if (petList) {
        let newPetList = [];
        let bmi = 0;
        for (let pet of petList) {
            if (pet.bmi === '?') {
                if (pet.type === 'Cat') {
                    bmi = (parseFloat(pet.weight) * 886) / parseFloat(pet.lengthPet) ** 2;
                    pet.bmi = bmi.toFixed(2);
                }

                else {
                    bmi = (parseFloat(pet.weight) * 703) / parseFloat(pet.lengthPet) ** 2;
                    pet.bmi = bmi.toFixed(2);
                }
            }
            newPetList.push(pet)
        }
        return newPetList;
    }
    return petList;
}

/**
 * 
 * @param {*} pets 
 * render list of pet in table
 */
const renderTableData = (petList) => {
    if (petList) {
        let petListElement = petList.map((petInfo) => {
            return `   
                    <tr id="${petInfo.id}">
                        <th scope="row">${petInfo.id}</th>
                        <td>${petInfo.name}</td>
                        <td>${petInfo.age}</td>
                        <td>${petInfo.type}</td>
                        <td>${petInfo.weight} kg</td>
                        <td>${petInfo.lengthPet} cm</td>
                        <td>${petInfo.breed}</td>
                        <td>
                            <i class="bi bi-square-fill" style="color: ${petInfo.color}"></i>
                        </td>
                        <td>${isInjection(petInfo.isVaccinated)}</td>
                        <td>${isInjection(petInfo.isDewormed)}</td>
                        <td>${isInjection(petInfo.isSterilized)}</td>
                        <td>${petInfo.bmi}</td>
                        <td>${petInfo.date}</td>
                        <td><button id="dele" onclick="deletePet('${petInfo.id}')" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                `
        })
        let rows = petListElement.join('');
        tableBodyEl.innerHTML = rows
    }
};

/**
 * Create new pet
 */
function btnSubmitEvent() {
    submitBtn.addEventListener("click", function () {
        let isValidation = true;
        isValidation = (
            isIdFormat(inputId.value.trim(), /^P\d{3}/g, 'Your id must be flow format: start with \'P\' and three number (P123)')
            && isDuplicateId(inputId.value.trim(), 'ID was exist. Please enter another ID!')
            && isEmptyText(inputName.value.trim(), 'Please tell us your pet\'s name!')
            && isNumberAndThanZero(inputAge.value.trim(), 'Your age must be integer and then zero!', 'age')
            && isSelect(selectType.value, 'Please tell us your pet\'s type!')
            && isNumberAndThanZero(inputWeight.value.trim(), 'Your pet\'s length must be number and than zero!')
            && isNumberAndThanZero(inputLength.value.trim(), 'Your pet\'s length must be number and than zero!')
            && isSelect(inputBreed.value, 'Please tell us your pet\'s breed!')
        );
        if (isValidation) {
            let petInfo = {
                id: inputId.value.trim(),
                name: inputName.value.trim(),
                age: inputAge.value.trim(),
                type: selectType.value,
                weight: inputWeight.value.trim(),
                lengthPet: inputLength.value.trim(),
                color: inputColor.value,
                breed: inputBreed.value,
                isVaccinated: inputVaccinated.checked,
                isDewormed: inputDewormed.checked,
                isSterilized: inputSterilized.checked,
                bmi: '?',
                date: formatDate(new Date()),
            }
            pets.push(petInfo);
            if (petInfo.isDewormed && petInfo.isVaccinated && petInfo.isSterilized)
                healthyPets.push(petInfo);
            isShowHealthyPet ? renderTableData(healthyPets) : renderTableData(pets);
            saveToStorage('pets', pets)
            saveToStorage('healthyPets', healthyPets)
            clearForm();
        }
    });
}

/**
 * Button show all pet to table
 */
function btnShowAllPetEvent() {
    showAllPetBtn.addEventListener('click', function () {
        isShowHealthyPet = false;
        renderTableData(pets);
        showAllPetBtn.classList.add('hidden')
        showHealthyPetBtn.classList.remove('hidden');
    })
}

/**
 * Button show pet healthy to table
 */
function btnShowHealthyPetEvent() {
    showHealthyPetBtn.addEventListener('click', function () {
        isShowHealthyPet = true;
        renderTableData(healthyPets);
        showHealthyPetBtn.classList.add('hidden')
        showAllPetBtn.classList.remove('hidden');
    })
}

/**
 * Button calculate bmi
 */
function btnBMIEvent() {
    bmiBtn.addEventListener("click", function () {
        if (!isShowHealthyPet) {
            pets = calculateBMIInPetList(pets);
            healthyPets = calculateBMIInPetList(healthyPets);
            renderTableData(pets);
            saveToStorage('pets', pets)
            saveToStorage('healthyPets', healthyPets)
        } else {
            healthyPets = calculateBMIInPetList(healthyPets);
            let pos = -1;
            for (let pet of healthyPets) {
                pos = findPet(pet.id, pets);

                if (pos > -1)
                    pets[pos].bmi = pet.bmi;
            }
            renderTableData(healthyPets);
            saveToStorage('pets', pets)
            saveToStorage('healthyPets', healthyPets)
        }
    });
}

/**
 * add or remove active class in sidebar
 */
const activeSideBar = () => {
    sidebarTitle.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    })
}

/**
 * 
 * @param {*} breeds 
 * render list of breed in dropdown
 */
const renderSelectBreed = (breeds) => {
    let listBreedEl = breeds.map((breed) => {
        return `
            <option>${breed.name}</option>
        `
    })
    inputBreed.innerHTML = `<option value="none">Select Breed</option>` + listBreedEl.join('')
}

/**
 * 
 * @param {*} value 
 * @returns list breed already filter
 */
const filterBreeds = (type) => {
    if (breeds) {
        return breeds.filter(breed => {
            return breed.type === type;
        })
    }
    return [];
}

/**
 * onchange value of select type
 */
const onchangeInputType = () => {
    selectType.onchange = function () {
        renderSelectBreed(filterBreeds(selectType.value));
    }
}

/**
 * Init program
 */
const init = () => {
    renderTableData();
    btnSubmitEvent();
    btnShowAllPetEvent();
    btnShowHealthyPetEvent();
    btnBMIEvent();
    activeSideBar();
    pets = getFromStorage("pets");
    healthyPets = getFromStorage("healthyPets");
    breeds = getFromStorage("breeds");
    renderTableData(pets);
    onchangeInputType();
};


init();



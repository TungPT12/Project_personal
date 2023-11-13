'use strict';

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
const tableBodyEl = $("#tbody");
const editInputEl = $("#edit-input")

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
        return false;
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
 * Clear all value in form
 */
const clearForm = () => {
    inputId.value = "";
    inputName.value = "";
    inputAge.value = "";
    selectType.value = `none`;
    inputWeight.value = "";
    inputLength.value = "";
    inputColor.value = "#000000";
    inputBreed.innerHTML = `<option value="none">Select Breed</option>`;
    inputBreed.value = "none";
    inputVaccinated.checked = false;
    inputDewormed.checked = false;
    inputSterilized.checked = false;
};

/**
 * hidden form edit
 */
const hiddenForm = () => {
    editInputEl.classList.add('hide');
}

/**
 * check checkbox is check or not
 * @param {*} isCheck 
 * @param {*} checkEl 
 */
const isCheckBoxChecked = (isCheck, checkEl) => {
    if (isCheck)
        checkEl.checked = true;
    else {
        checkEl.checked = false;
    }
}

/**
 * fill data of pet to form for edit
 * @param {*} id 
 */
const startEditPet = (id) => {
    if (editInputEl.classList.contains('hide')) {
        editInputEl.classList.remove('hide')
        let pos = findPet(id, pets);
        if (pos > -1) {
            renderSelectBreed(filterBreeds(pets[pos].type));
            inputId.value = pets[pos].id;
            inputName.value = pets[pos].name;
            inputAge.value = pets[pos].age;
            selectType.value = pets[pos].type;
            inputWeight.value = pets[pos].weight;
            inputLength.value = pets[pos].lengthPet;
            inputColor.value = pets[pos].color;
            inputBreed.value = pets[pos].breed;
            isCheckBoxChecked(pets[pos].isVaccinated, inputVaccinated);
            isCheckBoxChecked(pets[pos].isDewormed, inputDewormed);
            isCheckBoxChecked(pets[pos].isSterilized, inputSterilized);
        }
    } else {
        let pos = findPet(id, pets);
        if (pos > -1) {
            renderSelectBreed(filterBreeds(pets[pos].type));
            inputId.value = pets[pos].id;
            inputName.value = pets[pos].name;
            inputAge.value = pets[pos].age;
            selectType.value = pets[pos].type;
            inputWeight.value = pets[pos].weight;
            inputLength.value = pets[pos].lengthPet;
            inputColor.value = pets[pos].color;
            inputBreed.value = pets[pos].breed;
            isCheckBoxChecked(pets[pos].isVaccinated, inputVaccinated);
            isCheckBoxChecked(pets[pos].isDewormed, inputDewormed);
            isCheckBoxChecked(pets[pos].isSterilized, inputSterilized);
        }
    }
}

/**
 * 
 * @param {*} pets 
 * render list of pet in table
 */
const renderEdit = (petList) => {
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
                        <td>${petInfo.date}</td>
                        <td>
                            <button type="button" onclick="startEditPet('${petInfo.id}')" class="btn btn-warning" id="bmi-btn">Edit</button>
                        </td>
                    </tr>
                `
        })
        let rows = petListElement.join('');
        tableBodyEl.innerHTML = rows
    }
};

/**
 * update pet
 * @param {*} newPetData 
 * @param {*} id 
 * @param {*} isHealthyPet 
 */
const updatePet = (newPetData, id, isHealthyPet) => {
    let pos = findPet(id, pets);
    let posHealthy = findPet(id, healthyPets);
    pets[pos].name = newPetData.name;
    pets[pos].age = newPetData.age;
    pets[pos].type = newPetData.type;
    pets[pos].weight = newPetData.weight;
    pets[pos].lengthPet = newPetData.lengthPet;
    pets[pos].color = newPetData.color;
    pets[pos].breed = newPetData.breed;
    pets[pos].isVaccinated = newPetData.isVaccinated;
    pets[pos].isDewormed = newPetData.isDewormed;
    pets[pos].isSterilized = newPetData.isSterilized;
    pets[pos].bmi = newPetData.bmi;
    if (posHealthy > -1) {
        if (isHealthyPet) {
            healthyPets[posHealthy].name = newPetData.name;
            healthyPets[posHealthy].age = newPetData.age;
            healthyPets[posHealthy].type = newPetData.type;
            healthyPets[posHealthy].weight = newPetData.weight;
            healthyPets[posHealthy].lengthPet = newPetData.lengthPet;
            healthyPets[posHealthy].color = newPetData.color;
            healthyPets[posHealthy].breed = newPetData.breed;
            healthyPets[posHealthy].isVaccinated = newPetData.isVaccinated;
            healthyPets[posHealthy].isDewormed = newPetData.isDewormed;
            healthyPets[posHealthy].isSterilized = newPetData.isSterilized;
            healthyPets[posHealthy].bmi = newPetData.bmi;
        } else {
            healthyPets.splice(pos, 1)
        }
    } else {
        if (isHealthyPet) {
            healthyPets.push(pets[pos]);
        }
    }
    saveToStorage('pets', pets)
    saveToStorage('healthyPets', healthyPets)
}

/**
 * Update pet event
 */
function btnSubmitEvent() {
    submitBtn.addEventListener("click", function () {
        let isValidation = true;
        isValidation = (
            isEmptyText(inputName.value.trim(), 'Please tell us your pet\'s name!')
            && isNumberAndThanZero(inputAge.value.trim(), 'Your age must be integer and then zero!', 'age')
            && isSelect(selectType.value, 'Please tell us your pet\'s type!')
            && isNumberAndThanZero(inputWeight.value.trim(), 'Your pet\'s length must be number and than zero!')
            && isNumberAndThanZero(inputLength.value.trim(), 'Your pet\'s length must be number and than zero!')
            && isSelect(inputBreed.value, 'Please tell us your pet\'s breed!')
        );
        if (isValidation) {
            let newPetInfo = {
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
            }
            let isHealthyPet = newPetInfo.isDewormed && newPetInfo.isVaccinated && newPetInfo.isSterilized
            updatePet(newPetInfo, inputId.value.trim(), isHealthyPet)
            renderEdit(pets);
            clearForm();
            hiddenForm();
        }
    });
}

/**
 * render breeds to dropdown breed
 * @param {*} breeds 
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
 * @param {*} type 
 * @returns list breeds already filter
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
    btnSubmitEvent();
    pets = getFromStorage("pets");
    healthyPets = getFromStorage("healthyPets");
    breeds = getFromStorage("breeds");
    renderEdit(pets);
    onchangeInputType();
};


init();




'use strict';

let breeds = [];
const submitBtn = $('#submit-btn');
const inputBreed = $('#input-breed');
const selectType = $('#input-type');
const tableBodyEl = $('#tbody');

/**
 * 
 * @param {*} text 
 * @returns string was modify
 */
const UpperCaseFirstLetter = (text) => {
    let textArray = text.split(" ");
    return textArray.map((text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }).join(" ");
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
 * @param {*} name 
 * @param {*} type 
 * @param {*} warning 
 * @returns true if name and type is not exist | false if is exist
 */
const isDuplicateName = (name, type, warning) => {
    let pos = findBreed(name, type, breeds)
    if (pos < 0) {
        return true;
    }
    alert(warning)
    return false;
}


/**
 * 
 * @param {*} name 
 * @param {*} type 
 * @param {*} list 
 * @returns position if found value
 */
const findBreed = (name, type, list) => {
    let pos = list.findIndex((breed) => {
        return (breed.name.toUpperCase() == name.toUpperCase() && breed.type == type);
    })
    return pos
}

/**
 * Delete breed in table and list
 * @param {*} name 
 * @param {*} type 
 */
const deleteBreed = (name, type) => {
    let pos = findBreed(name, type, breeds);
    if (pos > -1) {
        let isDelete = confirm("Are you sure?");
        if (isDelete) {
            breeds.splice(pos, 1);
            saveToStorage("breeds", breeds);
            renderBreed(breeds)
        }
    } else {
        alert("Something wrong, please try again later!");
    }
};

/**
 * 
 * @param {*} breeds 
 * render list of breed in table
 */
const renderBreed = (breeds) => {
    if (breeds) {
        let breedListElement = breeds.map((breed, index) => {
            return `   
                    <tr id="${breed.name}">
                        <td>${++index}</td>
                        <td>${breed.name}</td>
                        <td>${breed.type}</td>
                        <td><button id="dele" onclick="deleteBreed('${breed.name}', '${breed.type}')" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                `
        })
        let rows = breedListElement.join('');
        tableBodyEl.innerHTML = rows
    }
};


/**
 * Clear all value in form
 */
const clearForm = () => {
    inputBreed.value = "";
    selectType.value = "none";
};

/**
 * Create new breed
 */
function btnSubmitEvent() {
    submitBtn.addEventListener("click", function () {
        let isValidation = true;
        isValidation = (
            isEmptyText(inputBreed.value.trim(), 'Please enter breed!')
            && isDuplicateName(inputBreed.value.trim(), selectType.value, 'This breed was exist. Please enter another breed!')
            && isSelect(selectType.value, 'Please select type!')
        );
        if (isValidation) {
            let breed = {
                name: UpperCaseFirstLetter(inputBreed.value.trim()),
                type: selectType.value,
            }
            breeds.push(breed);
            renderBreed(breeds)
            saveToStorage('breeds', breeds)
            clearForm();
        }
    });
}

/**
 * init function in program
 */
const init = () => {
    btnSubmitEvent();
    breeds = getFromStorage('breeds');
    renderBreed(breeds);
}

init();


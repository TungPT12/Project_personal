'use strict';

let breeds = [];
let pets = [];
const inputId = $("#input-id");
const inputName = $("#input-name");
const inputType = $("#input-type");
const inputBreed = $("#input-breed");
const inputVaccinated = $("#input-vaccinated");
const inputDewormed = $("#input-dewormed");
const inputSterilized = $("#input-sterilized");
const tableBodyEl = $("#tbody");
const findBtn = $("#find-btn");

/**
 * 
 * @param {*} breeds 
 * render list of breed in dropdown
 */
const renderSelectBreed = (breeds) => {
    let listBreed = [];
    let breedCat = filterBreedWithType('Cat', breeds)
    let breedDog = filterBreedWithType('Dog', breeds)
    if (breedCat.length > breedDog.length) {
        listBreed = [...breedCat];
        for (let indexDog = 0; indexDog < breedDog.length; indexDog++) {
            let isHave = false;
            for (let indexCat = 0; indexCat < breedCat.length; indexCat++) {
                if (breedDog[indexDog].name == breedCat[indexCat].name) {
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                listBreed.push(breedDog[0]);
            }

        }
    } else {
        listBreed = [...breedDog];
        for (let indexCat = 0; indexCat < breedCat.length; indexCat++) {
            let isHave = false;
            for (let indexDog = 0; indexDog < breedDog.length; indexDog++) {
                if (breedCat[indexCat].name == breedDog[indexDog].name) {
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                listBreed.push(breedCat[indexCat]);
            }

        }
    }
    let listBreedEl = listBreed.map((breed) => {
        return `
            <option>${breed.name}</option>
        `
    })

    inputBreed.innerHTML = `<option>Select Breed</option>` + listBreedEl.join('')
}

/**
 * 
 * @param {*} type 
 * @param {*} breeds 
 * @returns list breed already filter
 */
const filterBreedWithType = (type, breeds) => {
    return breeds.filter((breed) => {
        return breed.type == type
    })
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
                        <td>${petInfo.date}</td>
                        </td>
                    </tr>
                `
        })
        let rows = petListElement.join('');
        tableBodyEl.innerHTML = rows
    }
};

/**
 * 
 * @param {*} paramNames list of param in obj
 * @param {*} values list of value of param
 * @returns list pets already filter
 */
const filterParams = (paramNames, values) => {
    if (paramNames.length === 1) {
        if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase());
            })
        }
    } else if (paramNames.length === 2) {
        if (paramNames[0] == 'id' && paramNames[1] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]].toUpperCase().includes(values[1].toUpperCase());
            })
        } else if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]] == values[1];
            })
        } else {

            return pets.filter(pet => {
                return (pet[paramNames[0]] == values[0]
                    && pet[paramNames[1]] == values[1]);
            })
        }
    } else if (paramNames.length === 3) {
        if (paramNames[0] == 'id' && paramNames[1] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]].toUpperCase().includes(values[1].toUpperCase())
                    && pet[paramNames[2]] == values[2];
            })
        } else if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2];
            })
        } else {
            return pets.filter(pet => {
                return pet[paramNames[0]] == values[0]
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2];
            })
        }
    } else if (paramNames.length === 4) {
        if (paramNames[0] == 'id' && paramNames[1] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]].toUpperCase().includes(values[1].toUpperCase())
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3];
            })
        } else if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3];
            })
        } else {
            return pets.filter(pet => {
                return pet[paramNames[0]] == values[0]
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3];
            })
        }
    } else if (paramNames.length === 5) {
        if (paramNames[0] == 'id' && paramNames[1] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]].toUpperCase().includes(values[1].toUpperCase())
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4];
            })
        } else if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4];
            })
        } else {
            return pets.filter(pet => {
                return pet[paramNames[0]] == values[0]
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4];
            })
        }

    } else if (paramNames.length === 6) {
        if (paramNames[0] == 'id' && paramNames[1] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]].toUpperCase().includes(values[1].toUpperCase())
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4]
                    && pet[paramNames[5]] == values[5]
            })
        } else if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4]
                    && pet[paramNames[5]] == values[5]
            })
        } else {
            return pets.filter(pet => {
                return pet[paramNames[0]] == values[0]
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4]
                    && pet[paramNames[5]] == values[5];
            })
        }

    } else if (paramNames.length === 7) {
        if (paramNames[0] == 'id' && paramNames[1] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]].toUpperCase().includes(values[1].toUpperCase())
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4]
                    && pet[paramNames[5]] == values[5]
                    && pet[paramNames[6]] == values[6];
            })
        } else if (paramNames[0] == 'id' || paramNames[0] == 'name') {
            return pets.filter(pet => {
                return pet[paramNames[0]].toUpperCase().includes(values[0].toUpperCase())
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4]
                    && pet[paramNames[4]] == values[5]
                    && pet[paramNames[6]] == values[6];
            })
        } else {
            return pets.filter(pet => {
                return pet[paramNames[0]] == values[0]
                    && pet[paramNames[1]] == values[1]
                    && pet[paramNames[2]] == values[2]
                    && pet[paramNames[3]] == values[3]
                    && pet[paramNames[4]] == values[4]
                    && pet[paramNames[4]] == values[5]
                    && pet[paramNames[6]] == values[6];
            })
        }
    }
}

/**
 * Search pet with param
 * @param {*} id 
 * @param {*} name 
 * @param {*} type 
 * @param {*} breed 
 * @param {*} isVaccinated 
 * @param {*} isDewormed 
 * @param {*} isSterilized 
 */
const searchPet = (id, name, type, breed, isVaccinated, isDewormed, isSterilized) => {
    let listParamNames = [];
    let listValues = [];
    if (id) {
        listParamNames.push("id");
        listValues.push(id);
    }
    if (name) {
        listParamNames.push("name");
        listValues.push(name);
    }

    if (type != "Select Type") {
        listParamNames.push("type");
        listValues.push(type);
    }

    if (breed != "Select Breed") {
        listParamNames.push("breed");
        listValues.push(breed);
    }
    if (isVaccinated) {
        listParamNames.push("isVaccinated");
        listValues.push(isVaccinated);
    }
    if (isDewormed) {
        listParamNames.push("isDewormed");
        listValues.push(isDewormed);
    }
    if (isSterilized) {
        listParamNames.push("isSterilized");
        listValues.push(isSterilized);
    }
    renderTableData(filterParams(listParamNames, listValues));

}

/**
 * button find pet
 */
function btnFindEvent() {
    findBtn.addEventListener("click", function () {
        searchPet(inputId.value.trim(),
            inputName.value.trim(),
            inputType.value.trim(),
            inputBreed.value.trim(),
            inputVaccinated.checked,
            inputDewormed.checked,
            inputSterilized.checked
        )
    });
}

/**
 * init function in program
 */
const init = () => {
    breeds = getFromStorage('breeds');
    pets = getFromStorage('pets');
    renderSelectBreed(breeds)
    btnFindEvent();
}

init();

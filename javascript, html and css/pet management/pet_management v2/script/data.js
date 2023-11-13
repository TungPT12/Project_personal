'use strict';

const exportBtn = $("#export-btn");
const importBtn = $("#import-btn");
const inputFile = $("#input-file");

/**
 * export data to file.json
 */
function saveDynamicDataToFile() {
    window.location.href = '../page/edit.html';

    var fileInput = JSON.stringify(getFromStorage('pets'));
    var blob = new Blob([fileInput], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "pets.json");
}

/**
 * export event button
 */
const exportBtnEvent = () => {
    exportBtn.addEventListener('click', saveDynamicDataToFile);
}

/**
 * import event button
 */
const importBtnEvent = () => {
    importBtn.addEventListener('click', importFile);
}

/**
 * 
 * @param {*} elemetInputFile 
 * @returns true if file.json
 */
const checkTypeFile = (elemetInputFile) => {
    return elemetInputFile.files[0].name.endsWith('.json');
}

/**
 * import data
 */
const importFile = () => {
    let file = inputFile.files[0]
    let reader = new FileReader();
    try {
        if (checkTypeFile(inputFile)) {
            reader.onload = function () {
                let data = reader.result;
                let pets = JSON.parse(data);
                let healthyPets = pets.filter((pet) => {
                    return pet.isVaccinated && pet.isDewormed && pet.isSterilized;
                })
                saveToStorage('pets', pets);
                saveToStorage('healthyPets', healthyPets);
                alert("Import successfully!");
            }
            reader.readAsText(file);
        } else {
            alert("Please file must be .json type!")
        }
    } catch (e) {
        alert("Please choose a file!");
    }

}

/**
 * init function in program
 */
const init = () => {
    exportBtnEvent();
    importBtnEvent();
}

init();
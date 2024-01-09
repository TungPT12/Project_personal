const isEmptyInput = (input) => {
    if (input.trim()) {
        return true;
    }
    return false;
}
const isZeroInput = (input) => {
    input = parseFloat(input)
    if (input > 0) {
        return true;
    }
    return false;
}
const isZeroInputInt = (input) => {
    input = parseInt(input)
    if (input > 0) {
        return true;
    }
    return false;
}

const isInputInt = (input) => {
    input = parseInt(input)
    if (input) {
        return true;
    }
    return false;
}

const isShowWarning = (isValid, isTouch) => {
    if (isTouch) {
        if (isValid === false) {
            return true;
        }
    }
    return false
}

const isEmptySelect = (input) => {
    if (input !== 'none' || input === '') {
        return true;
    }
    return false;
}

const isValidInputRooms = (input) => {
    try {
        if (input) {
            const roomNumbers = input.split(',').map((number) => {
                return parseInt(number.trim());
            })
            if (roomNumbers.includes(NaN)) {
                return false;
            }
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

const validatedEmail = (input) => {
    let pattern = /^[a-zA-z0-9]+@([a-z]+\.)[\w-]{2,4}$/;
    if (input.trim()) {
        let result = pattern.test(input);
        return result;
    }
    return false;

}

const validPassword = (input) => {
    if (input.trim().length >= 8) {
        return true;
    }
    return false;
}

const validatePhoneNumber = (phone) => {
    const pattern = /^\d{10,11}$/
    const isPhone = pattern.test(phone)
    if (isPhone) {
        return true
    }
    return false;
}

const validateImages = (images) => {
    if (images.length > 0) {
        return true
    }
    return false;
}


export {
    isEmptyInput,
    isShowWarning,
    isEmptySelect,
    isZeroInput,
    isZeroInputInt,
    isValidInputRooms,
    validatedEmail,
    validatePhoneNumber,
    validPassword,
    isInputInt,
    validateImages,
}
const formatPrice = (textNumber) => {
    let splitArrayNumber = textNumber.split("");
    let lengthNumber = Math.ceil(splitArrayNumber.length / 3)
    let newArrayNumber = []
    for (let i = lengthNumber; i > 0; i--) {
        if (splitArrayNumber.length <= 3) {
            newArrayNumber.unshift(splitArrayNumber.join(''))
        } else {
            newArrayNumber.unshift(splitArrayNumber.splice((splitArrayNumber.length - 3), 3).join(''))
        }
    }
    return newArrayNumber.join('.')
}

export default formatPrice;
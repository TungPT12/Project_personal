
const paging = (dataArray, dataPerPage, page = 1) => {
    const startIndex = dataPerPage * (page - 1);
    const endIndex = startIndex + dataPerPage;
    if (dataArray.length <= 20) {
        return dataArray
    }
    results = dataArray.slice(startIndex, endIndex)
    return results;
}

module.exports = paging
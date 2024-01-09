
const setHeaders = ((token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token ? token : ""}`
        }
    }
})

export default setHeaders;
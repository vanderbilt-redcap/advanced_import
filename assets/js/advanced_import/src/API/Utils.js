export const objectToUrlSearchParams = (object) => {
    const search_params =  new URLSearchParams()

    for(let [key, value] of Object.entries({...object})) {
        // console.log(typeof value, value)
        if(typeof value == 'object') value = objectToUrlSearchParams({...value})
        search_params.append(key, value)
    }
    return search_params
}
function calculateMean(array) {
    const sum = array.reduce((acc, value) => acc + value, 0)
    return sum / array.length
}

function calculateStandardDeviation(array, mean) {
    const squaredDifferences = array.map(value => Math.pow(value - mean, 2))
    const variance = squaredDifferences.reduce((acc, value) => acc + value, 0) / array.length
    return Math.sqrt(variance)
}

function removeOutliers(array, threshold) {
    const mean = calculateMean(array)
    const stdDev = calculateStandardDeviation(array, mean)

    const filteredArray = array.filter(value => {
        const zScore = Math.abs((value - mean) / stdDev)
        return zScore <= threshold
    });

    return filteredArray
}

function removeOutliersFromObjectArrayByKey(array, threshold, key) {
    // Get values from array of objects by a key
    const values = array.map(obj => obj[key])

    // Remove outliers from values
    const filteredValues = removeOutliers(values, threshold)

    // Filter array of objects by values
    const filteredArray = array.filter(obj => filteredValues.includes(obj[key]))
    return filteredArray
}

function removeOutliersFromObjectArray(array, threshold) {

    for(let key in array[0]) {
        array = removeOutliersFromObjectArrayByKey(array, threshold, key)
    }

    return array

}


export { calculateMean, calculateStandardDeviation, removeOutliers, removeOutliersFromObjectArrayByKey, removeOutliersFromObjectArray }
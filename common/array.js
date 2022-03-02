import BigNumber from 'bignumber.js'

export function orderBy(array, property, order) {
  const isDesc = order === 'desc'
  return array.sort((aUndelegation, bUndelegation) => {
    const aProperty = aUndelegation[property]
    const bProperty = bUndelegation[property]
    // Compare any number in BigNumber
    if (!new BigNumber(aProperty).isNaN()) {
      const aNumber = new BigNumber(aProperty)
      const bNumber = new BigNumber(bProperty)
      if (aNumber.isEqualTo(bNumber)) return 0
      if (aNumber.isLessThan(bNumber)) return isDesc ? 1 : -1
      return isDesc ? -1 : 1
    }
    // Otherwise, use string compare
    return `${aProperty}`.localeCompare(`${bProperty}`) * (isDesc ? -1 : 1)
  })
}

export function shuffle(inputArray) {
  const outputArray = [...inputArray]
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]]
  }
  return outputArray
}

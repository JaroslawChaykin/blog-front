export const setFirstLetterUpper = (str: string): string => {
    const firstLetter = str[0].toUpperCase()
    const strWithoutFirstLetter = str.slice(1)

    return `${firstLetter}${strWithoutFirstLetter}`
}
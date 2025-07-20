export default function (html: string) {
    // Remove Vue hydration comments first
    const cleanHtml = html.replace(/<!--\[-->|<!--\]-->/g, '')

    // Process text content between tags, avoiding tags themselves
    const processedHtml = cleanHtml.replace(/>([^<]+)</g, (match, textContent) => {
        // Process each word individually, preserving all whitespace and punctuation
        const processedText = textContent.replace(/\b[a-z][a-z0-9\-']*\b/gi, (word: string) => {
            // Handle hyphenated words by processing each part separately
            if (word.includes('-')) {
                return word.split('-')
                    .map(part => part ? splitWordForBinaryReading(part) : part)
                    .join('-')
            }

            return splitWordForBinaryReading(word)
        })

        return `>${processedText}<`
    })

    return processedHtml
}

function splitWordForBinaryReading(word: string): string {
    if (word.length < 2) {
        return `<strong>${word}</strong>`
    }

    // Simple syllable-aware splitting heuristic
    const splitIndex = calculateSplitIndex(word)

    const firstHalf = word.substring(0, splitIndex)
    const secondHalf = word.substring(splitIndex)

    return `<strong>${firstHalf}</strong>${secondHalf}`
}

function calculateSplitIndex(word: string): number {
    const length = word.length

    // Default split at half the word length
    const splitIndex = Math.ceil(length / 2)

    // Check for common vowel pairs that shouldn't be split
    const vowelPairs = ['ai', 'au', 'ea', 'ee', 'ei', 'ie', 'oa', 'oo', 'ou', 'ui']
    const lowerWord = word.toLowerCase()

    for (let i = splitIndex - 1; i <= splitIndex; i++) {
        if (i > 0 && i < length - 1) {
            const pair = lowerWord.substring(i - 1, i + 1)
            if (vowelPairs.includes(pair)) {
                // Don't split vowel pairs; adjust the split index
                return Math.max(1, i - 1)
            }
        }
    }

    // Check if we're splitting a consonant cluster
    if (splitIndex < length - 1 && splitIndex > 0) {
        const afterSplit = lowerWord[splitIndex]
        const beforeSplit = lowerWord[splitIndex - 1]
        if (afterSplit && beforeSplit && (afterSplit === 'l' || afterSplit === 'r') && isConsonant(beforeSplit)) {
            return Math.max(1, splitIndex - 1)
        }
    }

    return Math.max(1, splitIndex)
}

function isConsonant(char: string): boolean {
    return !['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())
}

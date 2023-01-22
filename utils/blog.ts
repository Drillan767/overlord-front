import { parse } from 'node-html-parser'

export const getScrollPercent = () => {
    const prose = document.querySelector<HTMLDivElement>('.prose')

    if (prose) {
        const proseTop = prose.getBoundingClientRect().top + document.documentElement.scrollTop
        const proseBottom = proseTop + prose.clientHeight
        const browserBottom = window.scrollY + window.innerHeight

        if (browserBottom < proseTop) {
            return 0
        } else if (browserBottom > proseTop && browserBottom < proseBottom) {
            return (browserBottom - proseTop) / prose.offsetHeight * 100;
        } else {
            return 100
        }
    } else {
        return 0
    }
}

export const bodyHeaders = () => {
    let result = [];

    for (let i = 2; i <= 6; i++) {
        result.push(`.prose h${i}`)
    }

    return result.join(',')
}

export const scrollSpy = (headers: NodeListOf<Element>) => {
    let scrollTop = window.scrollY;

    document.querySelectorAll('.toc li').forEach((li) => li.classList.remove('active'))

    for (let i = headers.length - 1; i >= 0; i--) {
        const currentH = headers[i]
        const offset = currentH.getBoundingClientRect().top + scrollTop

        if (scrollTop > offset - 102) {
            document.querySelector(`.toc li a[href="#${currentH.id}"]`)?.parentElement?.classList.add('active')
            break;
        }
    }
}

export const getReadingTime = (text: string) => {
    const wpm = 200
    const stripped = text.replace(/(<([^>]+)>)/ig, '')
    const nbWords = stripped.trim().split(/\s+/).length
    return Math.ceil(nbWords / wpm)
}

export const toBionicReading = (text: string) => {
    const raw = parse(text)
    const allParagraphs = raw.querySelectorAll('p')
    // allParagraphs.forEach((p))
    console.log(allParagraphs.length)
    /*
        RULES
        =====

        1 character word: bold
        even length words: half bold
        odd length words: bold on less than the half (ie: 7 letters, the 3 firsts will be bold)
    */
    return ''
}
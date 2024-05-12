// import { parse } from 'node-html-parser'

export function scrollSpy(headers: NodeListOf<Element>) {
    const scrollTop = window.scrollY

    document.querySelectorAll('.toc li').forEach(li => li.classList.remove('active'))

    for (let i = headers.length - 1; i >= 0; i--) {
        const currentH = headers[i]
        const offset = currentH.getBoundingClientRect().top + scrollTop

        if (scrollTop > offset - 102) {
            document.querySelector(`.toc li a[href="#${currentH.id}"]`)?.parentElement?.classList.add('active')
            break
        }
    }
}

export function toBionicReading(text: string) {
    /* const raw = parse(text)
    const allParagraphs = raw.querySelectorAll('p')
    // allParagraphs.forEach((p))
    console.log(allParagraphs.length) */
    /*
        RULES
        =====

        1 character word: bold
        even length words: half bold
        odd length words: bold on less than the half (ie: 7 letters, the 3 firsts will be bold)
    */
    return text
}

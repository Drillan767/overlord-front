export const getScrollPercent = () => {
    const prose = document.querySelector<HTMLDivElement>('.prose')

    if (prose) {
        const proseTop = prose.offsetTop
        const proseBottom = proseTop + prose.offsetHeight
        const browserBottom = window.scrollY + window.innerHeight

        if (browserBottom < proseTop) {
            return 0
        } else if (browserBottom > proseTop && browserBottom < proseBottom) {
            return (browserBottom / proseBottom) * 100
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

export const toBionicReading = (text: string) => {
    
}
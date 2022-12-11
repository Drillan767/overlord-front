export const getScrollPercent = () => {
    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight'

    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
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

    document.querySelectorAll(`.toc li`).forEach((li) => li.classList.remove('active'))

    for (let i = headers.length - 1; i >= 0; i--) {
        const currentH = headers[i]
        const offset = currentH.getBoundingClientRect().top + scrollTop

        if (scrollTop > offset - 102) {
            document.querySelector(`.toc li a[href="#${currentH.id}"]`)?.parentElement?.classList.add('active')
            break;
        }
    }
}
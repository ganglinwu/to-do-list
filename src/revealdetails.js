export function revealDetails(clickEvent) {
    let todoDivShort = clickEvent.target;
    while (!todoDivShort.classList.contains('todoDiv')){
        todoDivShort = todoDivShort.parentElement;
    }
    const todoDivDetailed = todoDivShort.nextSibling;

    todoDivShort.classList.toggle('hidden');
    todoDivDetailed.classList.toggle('hidden');
}

export function hideDetails(clickEvent) {
    let todoDivDetailed = clickEvent.target;
    while (!todoDivDetailed.classList.contains('todoDivDetailed')){
        todoDivDetailed = todoDivDetailed.parentElement;
    }
    const todoDivShort = todoDivDetailed.previousSibling;

    todoDivShort.classList.toggle('hidden');
    todoDivDetailed.classList.toggle('hidden');
}

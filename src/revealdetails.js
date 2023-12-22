export function revealDetails(clickEvent) {
    const todoDivShort = clickEvent.target;
    const todoDivDetailed = todoDivShort.nextSibling;

    todoDivShort.classList.toggle('hidden');
    todoDivDetailed.classList.toggle('hidden');
}

export function hideDetails(clickEvent) {
    const todoDivDetailed = clickEvent.target.parentElement;
    const todoDivShort = todoDivDetailed.previousSibling;

    todoDivShort.classList.toggle('hidden');
    todoDivDetailed.classList.toggle('hidden');
}

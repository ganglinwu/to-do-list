export function revealDetails(clickEvent) {
    const todoDivShort = clickEvent.target;
    const todoDivDetailed = todoDivShort.nextSibling;

    todoDivShort.classList.toggle('hidden');
    todoDivDetailed.classList.toggle('hidden');
}

export function hideDetails(clickEvent) {
    const todoDivShort = clickEvent.target.previousSibling;
    const todoDivDetailed = clickEvent.target;

    todoDivShort.classList.toggle('hidden');
    todoDivDetailed.classList.toggle('hidden');
}

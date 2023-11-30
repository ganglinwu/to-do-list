export default function createEle(htmltag, attributeType, attribute) {
    const ele = document.createElement(htmltag);
    if (attributeType && attribute) {
        ele.setAttribute(attributeType, attribute);
    }
    return ele;
}


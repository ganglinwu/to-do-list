/**
 * This is a function that creates an HTMLElement and sets an attribute
 * @constructor
 * @param {string} htmltag - Tag of HTMLElement
 * @param {string} attributeType - Name of Attribute e.g. class, id, etc
 * @param {string} attribute - The className or ID you would like to add
 */
export default function createEle(htmltag, attributeType, attribute) {
    const ele = document.createElement(htmltag);
    if (attributeType && attribute) {
        ele.setAttribute(attributeType, attribute);
    }
    return ele;
}

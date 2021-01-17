function setActive(elements, element, classname) {
    elements.forEach(element => {
        element.classList.remove(classname);
    });

    element.classList.add(classname);
}
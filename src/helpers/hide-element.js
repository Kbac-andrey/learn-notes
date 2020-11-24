const hideElement = (element) => {
  if(!element) return
  if(Array.isArray(element)) {
    element.forEach(el => {
      el.style.display = 'none';
    })
  } else {
    element.style.display = 'none';
  }
}

export { hideElement };
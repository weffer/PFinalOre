function getImageURL(imagen) {  
  return new URL(`../assets/img/${imagen}`, import.meta.url).href;
}

export { getImageURL };

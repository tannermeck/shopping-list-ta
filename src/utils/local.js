export function setItem(item) {
  return localStorage.setItem('CART', JSON.stringify(item));
}
export function getItems() {
  // console.log(localStorage.getItem('CART'));
  const items = localStorage.getItem('CART');
  const parse = JSON.parse(items) || [];
  return parse;
}

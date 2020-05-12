export function addToCartRequest(id) {
  return {
    type: "@cart/ADD_REQUEST",
    id,
  };
}
export function addToCartSuccess(produto) {
  return {
    type: "@cart/ADD_SUCCESS",
    produto,
  };
}
export function removeFromCart(id) {
  return {
    type: "@cart/REMOVE",
    id,
  };
}

export function updateAmaunt(id, amount) {
  return {
    type: "@cart/UPDATE_AMOUNT",
    id,
    amount,
  };
}

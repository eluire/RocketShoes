export function addToCart(produto) {
  return {
    type: "ADD_TO_CART",
    produto,
  };
}

export function removeFromCart(id) {
  return {
    type: "REMOVE_FROM_CART",
    id,
  };
}

export function updateAmaunt(id, amount) {
  return {
    type: "UPDATE_AMAUNT_CART",
    id,
    amount,
  };
}

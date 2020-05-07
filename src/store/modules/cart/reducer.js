import produce from "immer";
export default function cart(state = [], action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.produto.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.produto,
            amount: 1,
          });
        }
      });
    case "REMOVE_FROM_CART":
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case "UPDATE_AMAUNT_CART":
      return produce(state, (draft) => {
        const product = draft.find((p) => p.id === action.id);

        if (action.amount < 1) {
          product.amount = 1;
        } else {
          product.amount = action.amount;
        }
      });
    default:
      return state;
  }
}

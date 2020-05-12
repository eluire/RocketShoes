import produce from "immer";
export default function cart(state = [], action) {
  console.log(action.type);
  switch (action.type) {
    case "@cart/ADD_SUCCESS":
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
    case "@cart/REMOVE":
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case "@cart/UPDATE_AMOUNT":
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

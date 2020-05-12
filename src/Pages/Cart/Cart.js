import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../Utils/format";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";
import { Container, Total, ProductTable } from "./styles";
import * as cartActions from "../../store/modules/cart/actions";

function Cart(props) {
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );
  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  // console.log(props.total);

  function handleRemoveProduct(produto) {
    dispatch(cartActions.removeFromCart(produto.id));
  }

  function increment(produto) {
    dispatch(cartActions.updateAmaunt(produto.id, produto.amount + 1));
  }

  function decrement(produto) {
    dispatch(cartActions.updateAmaunt(produto.id, produto.amount - 1));
  }
  function mountTable() {
    return (
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map((produto) => (
              <tr key={produto.id}>
                <td>
                  <img src={produto.image} alt={produto.title} />
                </td>
                <td>
                  <strong>{produto.title}</strong>
                  <span>{produto.precoFormatado}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(produto)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={produto.amount} />
                    <button type="button" onClick={() => increment(produto)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{produto.subtotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(produto)}
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
        <footer>
          <button type="button">Finalizar pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
    );
  }
  return mountTable(props);
}

export default Cart;

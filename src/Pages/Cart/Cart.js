import React from "react";
import { Link } from "react-router-dom";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdRemoveShoppingCart,
  MdDelete,
} from "react-icons/md";
import { connect } from "react-redux";
import { Container, Total, ProductTable } from "./styles";
import * as cartActions from "../../store/modules/cart/actions";

function Cart(props) {
  function handleRemoveProduct(produto) {
    const { dispatch } = props;

    dispatch(cartActions.removeFromCart(produto.id));
  }

  function increment(produto) {
    const { dispatch } = props;

    dispatch(cartActions.updateAmaunt(produto.id, produto.amount + 1));
  }

  function decrement(produto) {
    const { dispatch } = props;

    dispatch(cartActions.updateAmaunt(produto.id, produto.amount - 1));
  }
  function mountTable(props) {
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
            {props.cart.map((produto) => (
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
                  <strong>R$258,80</strong>
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
          <footer>
            <button type="button">Finalizar pedido</button>

            <Total>
              <span>TOTAL</span>
              <strong>R$1920,28</strong>
            </Total>
          </footer>
        </ProductTable>
      </Container>
    );
  }
  return mountTable(props);
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default connect(mapStateToProps)(Cart);

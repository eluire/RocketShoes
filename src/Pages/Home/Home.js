import React, { useEffect, useState } from "react";
import * as CartActions from "../../store/modules/cart/actions";
import { connect } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { Product_list } from "./styles";
import { formatPrice } from "../../Utils/format";
import api from "../../services/api";

function Home(props) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getProtutos();
  }, []);

  async function getProtutos() {
    try {
      const { data } = await api.get("/products");
      data.map((produto) => {
        setProdutos((prevproduto) => [
          ...prevproduto,
          {
            ...produto,
            precoFormatado: formatPrice(produto.price),
          },
        ]);
      });
    } catch {
      console.log("erro na requisição");
    }
  }
  function handleAddProduct(produto) {
    const { dispatch } = props;
    dispatch(CartActions.addToCart(produto));
  }

  function montarCatalogo(props) {
    if (Object.keys(produtos).length > 0) {
      return produtos.map((produto) => (
        <li key={produto.id}>
          <img src={produto.image} alt="Tênis" />
          <strong>{produto.title}</strong>
          <span>{produto.precoFormatado}</span>

          <button type="button" onClick={() => handleAddProduct(produto)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {props.amount[produto.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ));
    }
  }
  return <Product_list>{montarCatalogo(props)}</Product_list>;
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

export default connect(mapStateToProps)(Home);

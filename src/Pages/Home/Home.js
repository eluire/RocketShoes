import React, { useEffect, useState } from "react";
import * as CartActions from "../../store/modules/cart/actions";
import { useSelector, useDispatch } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { Product_list } from "./styles";
import { formatPrice } from "../../Utils/format";
import api from "../../services/api";

function Home() {
  const [produtos, setProdutos] = useState([]);

  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

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
  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function montarCatalogo() {
    return produtos.map((produto) => (
      <li key={String(produto.id)}>
        <img src={produto.image} alt={produto.title} />
        <strong>{produto.title}</strong>
        <span>{produto.precoFormatado}</span>

        <button type="button" onClick={() => handleAddProduct(produto.id)}>
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
            {amount[produto.id] || 0}
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    ));
  }
  return <Product_list>{montarCatalogo()}</Product_list>;
}

export default Home;

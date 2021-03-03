import { useRouter } from 'next/router'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Carregando...</p>, ssr: false } // ssr; false, faz com que o componente so seja renderizado no browser.
);

export default function Product() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(!isAddToCartModalVisible);
  }

  return (
    <div>
      <h1>{router.query.product_slug}</h1>

      <button onClick={handleAddToCart}>Adicionar ao carinho</button>

      { isAddToCartModalVisible && <AddToCartModal /> }
    </div>
  )
    
}
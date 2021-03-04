import { useRouter } from 'next/router'
import { useState } from 'react';
import PrismicDom from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import Prismic from 'prismic-javascript';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/lib/prismic';

// const AddToCartModal = dynamic(
//   () => import('@/components/AddToCartModal'),
//   { loading: () => <p>Carregando...</p>, ssr: false } // ssr; false, faz com que o componente so seja renderizado no browser.
// );

interface ProductProps {
  product: Document;
}

export default function Product({product}: ProductProps) {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(!isAddToCartModalVisible);
  }

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>
        {PrismicDom.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="300" alt={product.data.thumbnail.alt}/>

      <div dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(product.data.description) }}></div>

      <p>Preço: ${product.data.price}</p>
      <button onClick={handleAddToCart}>Adicionar ao carinho</button>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { product_slug } = context.params;

  const product = await client().getByUID('product', String(product_slug), {});

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`);
  // const products = await response.json();

  return {
      props: {
         product,
      },
      revalidate: 5,
  }
}
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents'
import PrismicDom from 'prismic-dom';

import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home( { recommendedProducts }: HomeProps ) {
  async function handleSum() {
    const math = (await import('../lib/math')).default; // Importação dinâmica.

    alert(math.sum(5, 3));
  }

  return (
    <div>
      <SEO title="DevCommerce, o seu e-commerce de tecnologia" shouldExcludeTitleSuffix />
      <section>
        <Title>Produtos</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>

        <button onClick={handleSum}>Somar!</button>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch(`http://localhost:3333/recommended`);
  // const recommendedProducts = await response.json();

  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}

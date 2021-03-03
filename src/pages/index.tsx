import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';


interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
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
                {recommendedProduct.title}
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
  const response = await fetch(`http://localhost:3333/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}

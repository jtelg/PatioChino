import Head from 'next/head';
import HomePage from '../components/client/page/Home/index';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Patio Chino | Tienda online</title>
        <meta name="description" content="Tienda online de comida rapida" />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <HomePage></HomePage>
    </div>
  );
}

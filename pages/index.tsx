import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useQuery } from "urql";

export default function Home() {
  const [{ fetching, data, error }] = useQuery({
    query: `
  query{
    products{
      id title rating
    }
  }
  `,
  });

  console.log(data, fetching, error);
  return (
    <div className={styles.container}>
      <Head>
        <title>GoLoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

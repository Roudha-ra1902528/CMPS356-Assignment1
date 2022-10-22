import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <body>
        <Link href="/dashboard"><a>Dashboard</a></Link>
      </body>
    </div>
  );
}

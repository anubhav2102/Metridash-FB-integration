import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log("Session:", session);

  const handlePostToFacebook = async () => {
    // Check if the user is authenticated and has required permission
    if (session && session.user?.email && session.user.accessToken) {
      try {
        // Post to Facebook using the Graph API
        const response = await fetch(
          `https://graph.facebook.com/${session.user.email}/feed`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.accessToken}`,
            },
            body: JSON.stringify({ message: "Hello from my Next.js app!" }),
          }
        );

        // Handle the API response as needed
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error posting to Facebook:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Authentication in Next.js app using Next-Auth
        </h1>
        <div className={styles.user}>
          {loading && <div className={styles.title}>Loading...</div>}
          {session ? (
            <>
              <p style={{ marginBottom: "10px" }}>
                Welcome, {session.user.name ?? session.user.email}
              </p>
              <br />
              <img src={session.user.image} alt="" className={styles.avatar} />
              <button onClick={handlePostToFacebook}>Post to Facebook</button>
            </>
          ) : (
            <p className={styles.title}>Please Sign in</p>
          )}
        </div>
      </main>
    </div>
  );
}
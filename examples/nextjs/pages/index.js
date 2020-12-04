import React from "react";

export default function HomePage({ name }) {
  return (
    <div>
      <h1>Hello {name}</h1>

      <p>This page is served using runtime SSR.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const resolveName = new Promise((resolve) => resolve("World"));
  return {
    props: {
      name: await resolveName,
    }, // will be passed to the page component as props
  };
}

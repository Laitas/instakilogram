import { useRouter } from "next/router";
import React from "react";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import Media from "../../components/Media";
import { trpc } from "../../utils/trpc";

const Id = () => {
  const { query, push } = useRouter();

  const { data } = trpc.useQuery(
    [
      "user.get",
      {
        id: query.id as string,
      },
    ],
    {
      onError: () => push("/"),
      retry: 0,
    }
  );

  return (
    <Layout>
      {data && (
        <>
          <Hero user={data} />
          <Media />
        </>
      )}
    </Layout>
  );
};

export default Id;

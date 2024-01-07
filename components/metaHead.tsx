import Head from "next/head";

type metaData = {
  title: string;
  description: string;
  url: string;
  image?: string;
};

const MetaHead = ({ title, description, url, image }: metaData) => {
  return (
    <Head>
      <title>{title || "종구공방"}</title>
      <meta
        name="description"
        content={
          description ||
          "인생 자동화를 꿈꾸는 귀차니즘 자동화 프로그램 무료 배포 사이트."
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "종구공방"} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || "https://jonggulog.vercel.app/"}
      />
      <meta property="og:image" content={image || "/profile.png"} />
      <meta
        property="og:description"
        content={
          description ||
          "인생 자동화를 꿈꾸는 귀차니즘 자동화 프로그램 무료 배포 사이트."
        }
      />
      <meta property="og:article:author" content="갓생종구" />
    </Head>
  );
};

export default MetaHead;

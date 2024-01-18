import Document, { Html, Head, Main, NextScript } from "next/document";
import MetaHead from "../components/metaHead";

class MyDocument extends Document {
  render() {
    return (
      // html 태그에 언어 설정
      <Html lang="ko">
        {/* <Head> 태그에는 모든 문서에 공통으로 적용할 (charset, 뷰포트 메타태그 등)이 들어갑니다. */}
        {/* google-site-verification=Bd1SUoTNWXeUMdGKzD1_FYj0KmA0tSwJZcFoXozsMHE */}
        <meta
          name="google-site-verification"
          content="pD-tS2jovinCyQSbO-JntskUC-t7JEdT-207MbaK29Q"
        />
        <meta
          name="naver-site-verification"
          content="4c7049efad60cdc78b96269784680cad9b4d0ce2"
        />
        <MetaHead
          title="종구공방 - 인생 자동화 프로젝트"
          description="각종 자동화 프로그램 무료 유지보수 및 배포"
          url="https://jonggulog.vercel.app/"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

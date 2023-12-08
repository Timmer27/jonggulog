import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      // html 태그에 언어 설정
      <Html lang="ko">
        {/* <Head> 태그에는 모든 문서에 공통으로 적용할 (charset, 뷰포트 메타태그 등)이 들어갑니다. */}
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
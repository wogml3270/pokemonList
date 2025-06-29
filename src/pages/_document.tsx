import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='안녕하세요 chimsil frontend developer 입니다.'
        />
        <meta name='author' content='chimsil dev' />
        <meta name='subject' content='기술블로그' />
        <meta name='Content-Script_Type' content='Text/typescript' />
        <meta name='Other Agent' content='chimsil' />
        <meta name='Copyright' content='chimsil' />
        <meta name='Generator' content='Visual Studio Code' />
        <meta name='keywords' content='chimsil, Dev, NextJS, pokedex' />
        <meta
          name='keywords'
          content='web, HTML, CSS, Javascript, Typescript, React, NextJS'
        />
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-F79MCK5Z88'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F79MCK5Z88');
        `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

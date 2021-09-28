// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Fragment } from 'react'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Fragment>
            <script type="text/javascript" src="https://cdn.iubenda.com/cons/iubenda_cons.js" async />
          </Fragment>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital@1&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=optional" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,400italic,700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

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
            <script src="https://js.stripe.com/v2/"></script>
            <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
          </Fragment>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital@1&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,400italic,700&display=swap"
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

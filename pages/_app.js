import React from 'react'
import { Provider } from 'react-redux'

import store from 'pages/store.js'

import 'styles/style.scss'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}

export default MyApp

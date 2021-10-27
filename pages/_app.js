import React from 'react'
import { Provider } from 'react-redux'

import store from 'store.js'

import 'styles/style.scss'

import { Toaster } from 'react-hot-toast'

// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/common/main.css'
// import '@fullcalendar/timegrid/main.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default MyApp

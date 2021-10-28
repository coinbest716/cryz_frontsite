import React from 'react'
import { Provider } from 'react-redux'

import store from 'store.js'

import 'styles/style.scss'

import { Toaster } from 'react-hot-toast'

// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/common/main.css'
// import '@fullcalendar/timegrid/main.css'

import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/timeline/main.css' // @fullcalendar/resource-timeline imports @fullcalendar/timeline
import '@fullcalendar/resource-timeline/main.css' // @fullcalendar/resource-timeline is a direct import

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

import React from 'react'
import { Provider } from 'react-redux'

import Amplify, { Auth } from 'aws-amplify'
import awsconfig from 'utils/aws-exports'

import store from 'store.js'

import 'styles/style.scss'

import { Toaster } from 'react-hot-toast'
import { ApolloProvider } from '@apollo/client'
import client from 'utils/apolloclient'

import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/timeline/main.css' // @fullcalendar/resource-timeline imports @fullcalendar/timeline
import '@fullcalendar/resource-timeline/main.css' // @fullcalendar/resource-timeline is a direct import

Amplify.configure({ ...awsconfig, ssr: true })
// Amplify.configure(awsconfig)
Auth.configure(awsconfig)

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
        <Toaster position="top-right" reverseOrder={false} />
      </ApolloProvider>
    </>
  )
}

export default MyApp

import React from 'react'
import { Provider } from 'react-redux'

// aws components
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from 'utils/aws-exports'

// third party components
import { Toaster } from 'react-hot-toast'

// graphql components
import { ApolloProvider } from '@apollo/client'
import client from 'utils/apolloclient'

// full calendar components
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/timeline/main.css' // @fullcalendar/resource-timeline imports @fullcalendar/timeline
import '@fullcalendar/resource-timeline/main.css' // @fullcalendar/resource-timeline is a direct import

// store
import store from 'store.js'

// styles
import 'styles/style.scss'

Amplify.configure({ ...awsconfig, ssr: true })
Auth.configure(awsconfig)

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || (page => page)

  const [viewport, setViewport] = React.useState('desktop') // mobile, ipad, desktop

  React.useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>{getLayout(<Component {...pageProps} viewport={viewport} />)}</Provider>
        <Toaster position="top-right" reverseOrder={false} />
      </ApolloProvider>
    </>
  )
}

export default MyApp

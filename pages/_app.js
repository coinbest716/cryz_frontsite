import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Script from 'next/script'

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
  const MainImage = '/images/main-mobile.png'
  const getLayout = Component.getLayout || (page => page)

  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
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
        <Script src="https://js.stripe.com/v2/"></Script>
        <Script id="stripe-js" src="https://js.stripe.com/v3/" async></Script>
        {viewport !== 'mobile' ? (
          <Provider store={store}>{getLayout(<Component {...pageProps} viewport={viewport} />)}</Provider>
        ) : (
          <div className={'w-full flex flex-wrap'}>
            <div className="-z-10 w-full h-full">
              <img src={MainImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className={'w-full flex flex-wrap -mt-8 pt-12 pb-32 px-4 justify-center z-10 bottomStyle'}>
              <div className="w-full title">¡Seguimos poniéndonos en forma!</div>
              <div className="w-full text text-center mt-9">
                En breve, cumpliremos nuestro objetivo y estará lista la versión móvil.
                <br />
                <br />
                Mientras tanto, puedes visitar
                <br />
                <br />
                <strong>https://crysdyazandco.com</strong>
                <br />
                <br />
                en tu ordenador o tablet
              </div>
            </div>
          </div>
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </ApolloProvider>
    </>
  )
}

export default MyApp

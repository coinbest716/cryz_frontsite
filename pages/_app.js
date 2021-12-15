import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Script from 'next/script'
import { useRouter } from 'next/router'
import Head from 'next/head'

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

import { DefaultSeo } from 'next-seo'

Amplify.configure({ ...awsconfig, ssr: true })
Auth.configure(awsconfig)

const MyApp = ({ Component, pageProps }) => {
  const MainImage = '/images/main-mobile.png'
  const router = useRouter()
  const getLayout = Component.getLayout || (page => page)

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Fisioterapia, entrenamiento personal y mucho más" />
        <meta name="keywords" content="Fisioterapia, entrenamiento personal y mucho más" />
        <title>CrysDyaz&Co</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="apple-mobile-web-app-title" content="CrysDyaz And Co"/>
        <meta name="application-name" content="CrysDyaz And Co"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff" />

      </Head>
      <DefaultSeo
          title="CrysDyaz&Co"
          description="Fisioterapia, entrenamiento personal y mucho más"
          openGraph={{
            type: 'website',
            locale: 'es_ES',
            url: 'https://crysdyazandco.com/',
            site_name: 'CrysDyaz&Co',
          }}
      />
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

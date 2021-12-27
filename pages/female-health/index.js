import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import MainSection from 'components/FemaleHealth/MainSection'
import DisciplineSection from 'components/FemaleHealth/DisciplineSection'

import styles from 'pages/female-health/FemaleHealth.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import { NextSeo } from 'next-seo'

const FemaleHealth = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props

  const [femHealth, setFemHealth] = useState({})
  const [getFemHealth, { data: femHealthData, loading: femHealthLoading, error: femHealthError }] = useLazyQuery(
    graphql.queries.getFemHealth
  )

  // handlers
  useEffect(() => {
    getFemHealth()
  }, [getFemHealth])

  useEffect(() => {
    if (!femHealthError && femHealthData && femHealthData.getFemHealth) {
      setFemHealth(femHealthData.getFemHealth)
    }
  }, [femHealthLoading, femHealthData, femHealthError])

  return (
    <>
      <NextSeo
        title="CrysDyaz&Co Salud Fem"
        description="Fisioterapia, entrenamiento personal y mucho más"
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          url: 'https://crysdyazandco.com/female-health',
          site_name: 'CrysDyaz&Co',
        }}
      />
      <div className={styles.container}>
        {JSON.stringify(femHealth) !== '{}' ? <MainSection data={femHealth} viewport={viewport} /> : <></>}
        <div id="discipline" className={'w-full flex justify-center'}>
          <DisciplineSection viewport={viewport} />
        </div>
      </div>
    </>
  )
}
export default FemaleHealth

FemaleHealth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

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

const FemaleHealth = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!femHealthError && femHealthData && femHealthData.getFemHealth) {
      setFemHealth(femHealthData.getFemHealth)
    }
  }, [femHealthLoading, femHealthData, femHealthError])

  return (
    <div className={styles.container}>
      {JSON.stringify(femHealth) !== '{}' ? <MainSection data={femHealth} /> : <></>}
      <div id="discipline" className={'w-full flex justify-center'}>
        <DisciplineSection viewport={viewport} />
      </div>
    </div>
  )
}
export default FemaleHealth

FemaleHealth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

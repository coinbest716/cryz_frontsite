import React from 'react'

// redux
import { useDispatch } from 'react-redux'

// components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import MainSection from 'components/FemaleHealth/MainSection'
import DisciplineSection from 'components/FemaleHealth/DisciplineSection'

import styles from 'pages/female-health/FemaleHealth.module.scss'

const FemaleHealth = props => {
  // loading part
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
  }, [isMounted])

  // variables
  const { viewport } = props

  return (
    <div className={styles.container}>
      <MainSection />
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

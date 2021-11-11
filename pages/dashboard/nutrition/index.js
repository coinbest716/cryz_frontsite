import React from 'react'

// redux
import { useDispatch } from 'react-redux'

import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './nutrition.module.scss'

const Nutrition = () => {
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

  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className={'h-full text-3xl'}>Nutrition</div>
    </div>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}

import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import MainSection from 'components/Home/MainSection'
import TeamSection from 'components/Home/TeamSection'
import COSection from 'components/Home/COSection'

// styles
import styles from 'styles/Home.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Home = props => {
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
  const [mainImage, setMainImage] = useState('')
  const [getMainImage, { data: mainImageData, loading: mainImageLoading, error: mainImageError }] = useLazyQuery(
    graphql.queries.getMainImage
  )

  // handlers
  useEffect(() => {
    getMainImage()
  }, [])

  useEffect(() => {
    if (!mainImageError && mainImageData && mainImageData.getMainImage) {
      setMainImage(mainImageData.getMainImage)
    }
  }, [mainImageLoading, mainImageData, mainImageError])

  return (
    <div className={styles.container}>
      <MainSection mainImage={mainImage} />
      <div id="team" className={'w-full h-10'} />
      <TeamSection />
      <COSection />
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

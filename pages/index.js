import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import MainSection from 'components/Home/MainSection'
import TeamSection from 'components/Home/TeamSection'
import COSection from 'components/Home/COSection'

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
  const { viewport } = props
  const [mainImage, setMainImage] = useState('')
  const [featuredServices, setFeaturedServices] = useState('')
  const [team, setTeam] = useState('')
  const [coTeam, setCoTeam] = useState('')

  const [getMainImage, { data: mainImageData, loading: mainImageLoading, error: mainImageError }] = useLazyQuery(
    graphql.queries.getMainImage
  )
  const [
    getFeaturedServices,
    { data: featuredServicesData, loading: featuredServicesLoading, error: featuredServicesError },
  ] = useLazyQuery(graphql.queries.getFeaturedServices)

  const [getEquipo, { data: equipoData, loading: equipoLoading, error: equipoError }] = useLazyQuery(
    graphql.queries.getEquipo
  )
  const [getUsersByPatient, { data: usersByPatientData, loading: usersByPatientLoading, error: usersByPatientError }] =
    useLazyQuery(graphql.queries.getUsersByPatient)

  // handlers
  useEffect(() => {
    getMainImage()
    getFeaturedServices()
    getEquipo()
    getUsersByPatient()
  }, [getMainImage, getFeaturedServices, getEquipo, getUsersByPatient])

  useEffect(() => {
    if (!mainImageLoading && !mainImageError && mainImageData && mainImageData.getMainImage) {
      setMainImage(mainImageData.getMainImage)
    }
  }, [mainImageLoading, mainImageData, mainImageError])

  useEffect(() => {
    if (
      !featuredServicesLoading &&
      !featuredServicesError &&
      featuredServicesData &&
      featuredServicesData.getFeaturedServices
    ) {
      let array = []
      featuredServicesData.getFeaturedServices.map((item, index) => {
        if (item.active === true) {
          array.push(item)
        }
      })
      setFeaturedServices(array)
    }
  }, [featuredServicesLoading, featuredServicesData, featuredServicesError])

  useEffect(() => {
    if (!equipoLoading && !equipoError && equipoData && equipoData.getEquipo) {
      setTeam(equipoData.getEquipo)
    }
  }, [equipoLoading, equipoData, equipoError])

  useEffect(() => {
    if (!usersByPatientLoading && !usersByPatientError && usersByPatientData && usersByPatientData.UsersByPatient) {
      setCoTeam(usersByPatientData.UsersByPatient)
    }
  }, [usersByPatientLoading, usersByPatientData, usersByPatientError])

  return (
    <div className={'flex flex-col justify-center items-center'}>
      {featuredServices !== '' && (
        <MainSection mainImage={mainImage} featuredServices={featuredServices} viewport={viewport} />
      )}
      <div id="team" className={'w-full h-10'} />
      <TeamSection team={team} viewport={viewport} />
      {coTeam !== '' ? <COSection coTeam={coTeam} viewport={viewport} /> : <></>}
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// custom components
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'

// styles
import styles from './personalData.module.scss'

const PersonalData = () => {
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
  const router = useRouter()

  return <div>Personal Page</div>
}
export default PersonalData

PersonalData.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Perfil">{page}</MobileDashboardLayout>
}

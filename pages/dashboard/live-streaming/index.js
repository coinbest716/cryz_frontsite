import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// third party components1
import ReactPlayer from 'react-player'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
// import Profile from 'components/components/dashboard/Profile'

// styles
import styles from './LiveStreaming.module.scss'

// json data
import LiveStreamingData from 'assets/data/LiveStreamingData.json'

const LiveStreaming = () => {
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

  const url = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const [material, setMaterial] = useState([])

  useEffect(() => {
    setMaterial(LiveStreamingData)
  }, [])

  return (
    <div className={'h-fll pt-12 pl-14 pr-8 h-screen ' + styles.container}>
      <div className={'grid grid-cols-12 gap-6'}>
        <div className={'col-span-12 md:col-span-8 sm:col-span-12 pt-4'}>
          <div className={styles.title}>1 to 1 Streaming</div>
          <div className={'pt-14'}>
            <ReactPlayer url={url} width="100%" height="100%" className={styles.reactPlayer} controls={true} />
          </div>
        </div>
        <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
          <div className={'flex justify-end items-center'}>
            <NotificationButton />
            {/* <Profile /> */}
          </div>
          <div className={'rounded-xl bg-white py-4 px-16 pb-10 mt-10'}>
            <div className={styles.material}>Material necesario</div>
            <div className={'pt-7'}>
              {material.map((item, index) => (
                <div className={'flex justify-start py-2'} key={index}>
                  <div className={styles.imageArea}>
                    <Image src={item.url} alt="" width={56} height={56} objectFit="cover" objectPosition="center" />
                  </div>
                  <div className={'pl-4 flex flex-col justify-around'}>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.count}>{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LiveStreaming

LiveStreaming.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}

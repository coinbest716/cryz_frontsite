import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/404.module.scss'

// images
import ErrorImage from 'assets/images/error.png'

const Custom404 = () => {
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

  return (
    <div className={'w-full flex justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.container}>
          <div className={styles.title}>ERROR 404</div>
          <div className={styles.divider} />
          <div className={'flex justify-center mb-56'}>
            <Image src={ErrorImage} width={388} height={321} alt="" />
            <div className={'block ' + styles.textArea}>
              <div className={styles.subTitle}>NOS HEMOS CAIDO</div>
              <div className={styles.text}>
                Ha sido un imprevisto, pero estamos
                <br />
                trabajando para solucionarlo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Custom404

Custom404.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

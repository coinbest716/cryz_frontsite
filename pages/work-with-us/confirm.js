import React from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './confirm.module.scss'

// images
import ConfirmImage from 'assets/images/confirm.png'

const Confirm = () => {
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
  const fileRef = React.createRef()

  // handlers
  const handleAttachFile = event => {
    console.log(event.target.files[0])
  }

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={globlaStyle.container}>
        <div className={styles.container}>
          <div className={'w-full flex justify-center ' + styles.title}>¡GRACIAS POR TU CV!</div>
          <div className={'w-full flex justify-center'}>
            <Image src={ConfirmImage} alt="" width={270} height={222} />
          </div>
          <div className={'w-full ' + styles.text}>
            NOS PONDREMOS EN CONTACTO CONTIGO MUY PRONTO SI CUMPLES LOS REQUISITOS
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm

Confirm.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

import React, { createRef, useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './index.module.scss'

const WorkWithUs = () => {
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
  const fileRef = createRef()
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop

  // handlers
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])

  const handleAttachFile = event => {
    console.log(event.target.files[0])
  }

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.container}>
          <div className={viewport === 'mobile' ? styles.mobileTitle : styles.title}>Trabaja con nosotros</div>
          <div className={viewport === 'mobile' ? styles.mobileDivider : styles.divider} />
          <div className={'w-full md:w-2/3 ' + styles.text}>
            Si quieres formar parte de la familia de Crys Dyaz & CO, rellena este formulario, adjunta tu CV y cuéntanos
            un poco más sobre ti
          </div>
          {/* form part */}
          <div className={'mt-14 '}>
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-12 md:col-span-7 mr-0 md:mr-24'}>
                <div className={styles.label}>Nombre</div>
                <input
                  className={
                    'appearance-none bg-transparent border rounded w-full h-10 text-gray-700 mr-3 py-1 px-5 mb-4 leading-tight focus:outline-none ' +
                    styles.input
                  }
                  type="text"
                  placeholder="Nombre"
                  aria-label="Nombre"
                />
                <div className={styles.label}>Apellidos</div>
                <input
                  className={
                    'appearance-none bg-transparent border rounded w-full h-10 text-gray-700 mr-3 py-1 px-5 mb-4 leading-tight focus:outline-none ' +
                    styles.input
                  }
                  type="text"
                  placeholder="Apellidos"
                  aria-label="Apellidos"
                />
                <div className={styles.label}>Breve descripción</div>
                <textarea
                  className={
                    'appearance-none bg-transparent border rounded w-full h-40 text-gray-700 mr-3 py-2 px-5 mb-4 leading-tight focus:outline-none ' +
                    styles.input
                  }
                  type="text"
                  placeholder="Breve descripción"
                  aria-label="Breve descripción"
                />
              </div>
              <div className={'col-span-12 md:col-span-3'}>
                <div className={styles.label}>Teléfono</div>
                <input
                  className={
                    'appearance-none bg-transparent border rounded w-full h-10 text-gray-700 py-1 px-5 mb-4 leading-tight focus:outline-none ' +
                    styles.input
                  }
                  type="text"
                  placeholder="Teléfono"
                  aria-label="Teléfono"
                />
                <div className={styles.label}>Email</div>
                <input
                  className={
                    'appearance-none bg-transparent border rounded w-full h-10 text-gray-700 py-1 px-5 mb-4 leading-tight focus:outline-none ' +
                    styles.input
                  }
                  type="text"
                  placeholder="Email"
                  aria-label="Email"
                />
                <div className={'relative'}>
                  <div className={'hidden md:flex ' + styles.label}>&nbsp;</div>
                  <input className={'hidden'} type="file" id="img_frontr" onChange={handleAttachFile} ref={fileRef} />
                  <input
                    className={
                      'appearance-none bg-transparent border rounded w-full h-10 text-gray-700 py-1 pl-5 pr-36 mb-4 leading-tight focus:outline-none ' +
                      styles.input
                    }
                    type="text"
                    placeholder="Attach File"
                    aria-label="Attach File"
                  />
                  <button
                    className={'absolute bottom-0 right-0 h-10 mb-4 px-4 rounded ' + styles.button}
                    onClick={onClickAttachFile}
                  >
                    Adjuntar pdf
                  </button>
                </div>
                <div className={'w-full flex justify-end'}>
                  <button className={'mt-10 md:mt-48 h-10 w-full md:w-2/3 ' + styles.button}>ENVIAR CV</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkWithUs

WorkWithUs.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

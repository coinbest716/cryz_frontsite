import React, { createRef, useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import WorkWithUsText from 'components/workwithus/WorkWithUsText'
import WorkWithUsButton from 'components/workwithus/WorkWithUsButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './detail.module.scss'

// images
import ConfirmImage from 'assets/images/confirm.png'

const Detail = props => {
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
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    email: '',
    url: '',
  })
  const fileRef = createRef()

  // handlers
  const mockupData = {
    id: 5,
    title: 'Nutricionista deportivo y entrenador personal',
    description:
      'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.agittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.',
    content:
      'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.agittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.',
  }
  const handleAttachFile = event => {}

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }
  const [mainInfo, setMainInfo] = useState({})

  useEffect(() => {
    setMainInfo(mockupData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUploadPDF = () => {}

  const handleClickCV = () => {}

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' my-20'}>
          <div className={'mt-9'}>
            <BackButton viewport={viewport} />
          </div>
          <div className="flex flex-wrap justify-between mt-10">
            <div>
              <div className={styles.topTitle}>Inscribirse</div>
              <div className={styles.topDash + ' mt-5 mb-6'} />
              <div className={styles.shortText}>
                Estás mas cerca de formar parte de la familia de CrysDyaz&Co, rellena este <br />
                formulario y adjunta tu CV..
              </div>
            </div>
            <CircularMark />
          </div>
          <div className="mt-5 w-3/4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-6/12">
                <WorkWithUsText
                  handleChange={e => handleChangePersonal(e, 'name')}
                  label={'Nombre'}
                  placeholder={''}
                  type={'text'}
                  value={personalInfo.name}
                />
              </div>
              <div className="w-4/12">
                <WorkWithUsText
                  handleChange={e => handleChangePersonal(e, 'email')}
                  label={'Email'}
                  placeholder={''}
                  type={'text'}
                  value={personalInfo.email}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center mt-5">
              <div className="w-6/12">
                <WorkWithUsText
                  handleChange={e => handleChangePersonal(e, 'surname')}
                  label={'Apellidos'}
                  placeholder={''}
                  type={'text'}
                  value={personalInfo.surname}
                />
              </div>
              <div className="w-4/12 flex justify-start items-center" style={{ marginTop: '26px' }}>
                <WorkWithUsText
                  handleChange={e => handleChangePersonal(e, 'url')}
                  label={''}
                  placeholder={''}
                  type={'text'}
                  value={personalInfo.name}
                />
                <div className="">
                  <WorkWithUsButton label={'Adjuntar pdf'} handleClick={handleUploadPDF} type={'pdf'} />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-16">
              <WorkWithUsButton label={'ENVIAR CV'} handleClick={handleClickCV} type={'cv'} />
            </div>
          </div>
          <div className={styles.contentContainer + ' mt-16 px-7 py-12'}>
            <div className={styles.withTitle + ' mb-12'}>{mainInfo.title}</div>
            <div className={styles.withContent}>{mainInfo.content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

Detail.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import Radio from 'components/components/Radio'

// images and icons
import CloseIcon from 'assets/images/close.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

// styles
import styles from './Questionnaire.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Questionnaire = props => {
  // variables
  const { onClick, viewport } = props
  const [
    getPendingQuestionnaireByDashboard,
    { data: pendingQuestionnaireData, loading: pendingQuestionnaireLoading, error: pendingQuestionnaireError },
  ] = useLazyQuery(graphql.queries.getPendingQuestionnaireByDashboard)
  const [questionnaireData, setQuestionnaireData] = useState({})

  // handlers
  useEffect(() => {
    getPendingQuestionnaireByDashboard()
  }, [getPendingQuestionnaireByDashboard])

  useEffect(() => {
    if (
      !pendingQuestionnaireError &&
      pendingQuestionnaireData &&
      pendingQuestionnaireData.getPendingQuestionnaireByDashboard
    ) {
      setQuestionnaireData(pendingQuestionnaireData.getPendingQuestionnaireByDashboard)
    }
  }, [pendingQuestionnaireLoading, pendingQuestionnaireData, pendingQuestionnaireError])

  return (
    <div className={styles.card}>
      <div className={styles.closeButton}>
        <button
          className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
          onClick={() => onClick()}
        >
          <Image
            src={viewport === 'mobile' ? CloseGrayIcon : CloseIcon}
            alt="..."
            width={viewport === 'mobile' ? 16 : 30}
            height={viewport === 'mobile' ? 16 : 30}
          />
        </button>
      </div>
      <div className={styles.title}>Rellena el cuestionario</div>
      <div className={styles.underline}></div>
      <div className={styles.scrollbarArea}>
        <PerfectScrollbar>
          <div className={styles.subTitle}>Titulo de sección</div>
          <div className="ml-3">
            <div className={styles.text + ' mt-5'}>UNA RESPUESTA</div>
            <div className="mt-5">
              <Radio name={'group1'} value={'yes'} label={'Sí'} />
            </div>
            <div className="mt-5">
              <input placeholder="Padezco de…" className={styles.inputArea} />
            </div>
            <div className="mt-5">
              <Radio name={'group1'} value={'no'} label={'No'} />
            </div>
            <div className={styles.subTitle + ' mt-5'}>TEXT FIELD</div>
            <div className="mt-5">
              <input placeholder="00kg" className={styles.inputArea} />
            </div>
          </div>
          <div className={styles.subTitle + ' mt-16'}>Titulo de sección</div>
          <div className="ml-3">
            <div className={styles.text + ' mt-5'} style={{ marginTop: '21px' }}>
              MÚLTIPLES RESPUESTAS
            </div>
            <div className="mt-5">
              <Radio name={'group2'} value={'yes'} label={'Sí'} />
            </div>
            <div className="mt-5">
              <Radio name={'group2'} value={'no'} label={'No'} />
            </div>
            <div className="mt-5">
              <Radio name={'group2'} value={'occasionally'} label={'Ocasionalmente'} />
            </div>
            <div className={styles.subTitle + ' mt-5'}>TEXT FIELD</div>
            <div className="mt-5">
              <input placeholder="00kg" className={styles.inputArea} />
            </div>
          </div>
        </PerfectScrollbar>
      </div>
      <div className="flex justify-center mt-20 lg:mt-24 lg:mr-16">
        <button className={'flex justify-center items-center ' + styles.outlineButton} onClick={() => {}}>
          ENVIAR
        </button>
      </div>
    </div>
  )
}

export default Questionnaire

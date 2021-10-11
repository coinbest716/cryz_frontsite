import React from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'

import $ from 'jquery'

// custom component
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'pages/female-health/PreparationForChildbirth.module.scss'

const PreparationForChildbirth = () => {
  const [readMoreCurrentState, setReadMoreCurrentState] = React.useState('less')

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={'w-full flex justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        <div className={'grid grid-cols-12 gap-4 mb-20'}>
          <div className={'col-span-5 block'}>
            <div className={styles.strokeTitle}>Preparación</div>
            <div className={styles.pinkTitle}>AL PARTO</div>
            <div className={styles.divider} />
            <div
              id="text"
              className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
            >
              Una de nuestras especialidades por excelencia es el acompañamiento de la mujer para este día. La
              preparación al parto se realiza con fisioterapeutas especializadas en suelo pélvico con amplia experiencia
              en ello. El objetivo principal es que la mujer se sienta segura y preparada para el gran día. Se realizan
              sesiones individuales para cuidar del suelo pélvico, controlar el abdomen y prevenir lesiones, también se
              realiza drenaje, presoterapia, movilidad, tratamiento manual de estructuras pélvicas y tratamiento
              perineal preparatorio al parto o masaje perineal. Nos encanta completar esta preparación con sesiones en
              pareja para que os puedan acompañar desde el masaje, posiciones y movimiento durante la dilatación y el
              control de otras herramientas analgésicas. La mujer de forma instintiva sabe parir, nosotras sólo le
              enseñamos el camino para que ella descubra cómo hacerlo.
              <ReadMoreButton currentState={readMoreCurrentState} onClick={state => handleReadMore(state)} />
            </div>
          </div>
          <div className={'col-span-7 flex'}>bbbb</div>
        </div>
      </div>
    </div>
  )
}
export default PreparationForChildbirth

PreparationForChildbirth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

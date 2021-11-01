import React from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// custom component
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import CircularMark from 'components/components/CircularMark'
import CarouselFemaleHealth from 'components/FemaleHealth/CarouselFemaleHealth'
import OutlineButton from 'components/components/OutlineButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/female-health/PreparationForChildbirth.module.scss'

// json data
import ServerPhysiotherapy from 'assets/data/ServerPhysiotherapy'
import router from 'next/router'

const PreparationForChildbirth = () => {
  const [sliderData, setSliderData] = React.useState([])

  const [readMoreCurrentState, setReadMoreCurrentState] = React.useState('less')

  React.useEffect(() => {
    setSliderData(ServerPhysiotherapy)
  }, [])

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={'w-full flex flex-wrap justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        <div className={'grid grid-cols-12 gap-4 mb-20'} style={{ minHeight: '634px' }}>
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
          <div className={'col-span-7 relative flex justify-end'}>
            <div className={'absolute top-10 z-10'}>
              <CircularMark />
            </div>
            <div className={'w-full mt-20'}>
              <CarouselFemaleHealth sliderData={sliderData} />
            </div>
          </div>
        </div>
      </div>
      {/* Button group part */}
      <div className={'w-full'}>
        <div className={'grid grid-cols-12 gap-0'}>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton
              title="Compra 1 to 1 en streaming"
              link="/buy-one-to-one"
              onClick={link => router.push(link)}
            />
          </div>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton title="Compra presenciales" link="/buy-person" onClick={link => router.push(link)} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PreparationForChildbirth

PreparationForChildbirth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

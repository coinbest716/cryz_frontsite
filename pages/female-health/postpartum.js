import React from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom component
import PrimaryLayout from 'components/Layout/PrimaryLayout'
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

const Postpartum = () => {
  // loading part
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
  }, [isMounted])

  // variables
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
        <div className={'grid grid-cols-12 gap-4'} style={{ minHeight: '634px' }}>
          <div className={'col-span-5 block'}>
            <div className={styles.strokeTitle}>EL</div>
            <div className={styles.pinkTitle}>POSTPARTO</div>
            <div className={styles.divider} />
            <div
              id="text"
              className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
            >
              El post parto, es una de las fases más intensas en la vida de una madre, por eso, tener un seguimiento
              exhaustivo de la paciente es vital para nosotros.
              <br />
              <br />
              A partir de los 40 días se debe hacer una valoración de abdomen y suelo pélvico con ecografía funcional.
              En ella se explora diástasis y competencia abdominal, suelo pélvico y posibles cicatrices. Con la
              información obtenida, personalizamos los tratamientos adaptando los tiempos, maquinaria y ejercicios a lo
              que necesite cada paciente. En éstos se puede utilizar biofeedback, terapia manual, electroterapia,
              radiofrecuencia, láser y ejercicio activo.
              <br />
              <br />
              Aunque cada post parto es un mundo, nunca es tarde para trabajar la zona abdminopélvica tan olvidada e
              importante para la calidad de vida de la mujer.
              <ReadMoreButton currentState={readMoreCurrentState} onClick={state => handleReadMore(state)} />
            </div>
          </div>
          <div className={'col-span-7 relative flex justify-end'}>
            <div className={'absolute top-10 z-10'}>
              <CircularMark />
            </div>
            <div className={'w-full h-full mt-20 pb-20'}>
              <CarouselFemaleHealth sliderData={sliderData} />
            </div>
          </div>
        </div>
      </div>
      {/* Button group part */}
      <div className={'w-full pt-32'}>
        <div className={'grid grid-cols-12 gap-0'}>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton
              title="Compra 1 to 1 en streaming"
              link="/buy/buy-one-to-one"
              onClick={link => router.push(link)}
            />
          </div>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton title="Compra presenciales" link="/buy/buy-person" onClick={link => router.push(link)} />
          </div>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton
              title="Compra planes online"
              link="/buy/buy-plans-online"
              onClick={link => router.push(link)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Postpartum

Postpartum.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

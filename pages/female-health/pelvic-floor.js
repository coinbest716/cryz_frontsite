import React from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// custom component
import BackButton from 'components/components/BackButton'
// import ReadMoreButton from 'components/components/ReadMoreButton'
import CircularMark from 'components/components/CircularMark'
import CarouselFemaleHealth from 'components/FemaleHealth/CarouselFemaleHealth'
import OutlineButton from 'components/components/OutlineButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/female-health/PreparationForChildbirth.module.scss'

// json data
import ServerPhysiotherapy from 'assets/data/ServerPhysiotherapy'
import router from 'next/router'

const PelvicFloor = () => {
  const [sliderData, setSliderData] = React.useState([])

  // const [readMoreCurrentState, setReadMoreCurrentState] = React.useState('less')

  React.useEffect(() => {
    setSliderData(ServerPhysiotherapy)
  }, [])

  // const handleReadMore = state => {
  //   setReadMoreCurrentState(state)
  // }

  return (
    <div className={'w-full flex flex-wrap justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        <div className={'grid grid-cols-12 gap-4'} style={{ minHeight: '634px' }}>
          <div className={'col-span-5 block'}>
            <div className={styles.strokeTitle}>Suelo</div>
            <div className={styles.pinkTitle}>PÉLVICO</div>
            <div className={styles.divider} />
            <div id="text" className={'relative ' + styles.text + ' ' + styles.expand}>
              {/* className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)} */}
              La patología de suelo pélvico, aunque poco conocida, es más frecuente de lo que pensamos, produciendo
              trastornos del tipo: dolor en relaciones sexuales o con la menstruación, incontinencia anal o urinaria,
              incontinencia de urgencia, prolapsos de órganos pélvicos, estreñimientos crónicos, hemorroide, etc. Como
              unidad referente en trabajo multidisciplinar de entrenamiento y fisioterapia, en Crys & CO, consideramos
              que toda mujer que realiza deporte debe hacerse una valoración abdominopélvica para prevenir este tipo de
              lesiones derivadas de la carga de peso, mala ejecución de ejercicios o el impacto repetido.
              {/* <ReadMoreButton currentState={readMoreCurrentState} onClick={state => handleReadMore(state)} /> */}
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
        </div>
      </div>
    </div>
  )
}
export default PelvicFloor

PelvicFloor.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

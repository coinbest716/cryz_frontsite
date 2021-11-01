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

const ChildSleepCounseling = () => {
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
            <div className={styles.strokeTitle}>Asesoría</div>
            <div className={styles.pinkTitle}>SUEÑO INFANTIL</div>
            <div className={styles.divider} />
            <div
              id="text"
              className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
            >
              Se trata de un método propio y respetuoso con los bebés y que se adapta a las diferentes maneras de criar.
              <br />
              <br />
              Impartido por Olga Sesé, coach del sueño infantil, gracias a ella más de 1.300 familias han vuelto a
              dormir después de haber pasado por su consulta.
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
        </div>
      </div>
    </div>
  )
}
export default ChildSleepCounseling

ChildSleepCounseling.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

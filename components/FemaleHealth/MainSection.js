import React from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// next components
import { useRouter } from 'next/router'

// custom component
import CircularMark from 'components/components/CircularMark'

// images
import StarGroup from 'assets/images/star-group.svg'

// json data
import FemaleHealthCarouselData from 'assets/data/FemaleHealthCarouselData'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'components/FemaleHealth/MainSection.module.scss'

const MainSection = () => {
  const router = useRouter()
  const [sliderData, setSliderData] = React.useState([])

  React.useEffect(() => {
    setSliderData(FemaleHealthCarouselData)
  }, [])

  const handleGotoDiscipline = () => {
    const sectionPosition = document.getElementById('discipline').offsetTop
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth',
    })
    setTimeout(() => {
      router.push('/female-health#discipline')
    }, 500)
  }
  return (
    <div className={'w-full p-0'}>
      <div className={'relative w-full p-0 m-0 h-screen flex flex-wrap justify-center ' + styles.container}>
        {/* carousel part */}
        <div className={'relative h-full grid grid-cols-12 gap-4'}>
          <div className={'col-span-5 flex'}></div>
          <div className={'col-span-7 flex'}>
            <div className={'col-span-7 flex justify-center items-center'}>
              <div>
                {sliderData.length !== 0 ? (
                  <Carousel
                    showArrows={false}
                    showThumbs={false}
                    autoPlay={true}
                    stopOnHover={true}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={33}
                    interval={3000}
                  >
                    {sliderData.map((item, index) => (
                      <div key={index} className="mx-1">
                        <Image src={item.image} alt="" width={283} height={544} />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* text part */}
        <div className={globalStyles.container + ' absolute '}>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-5 flex'}>
              <div className={'w-full'}>
                <div className={'flex'}>
                  <p className={styles.title}>
                    Salud
                    <br />
                    FEM.
                  </p>
                </div>
                <div className={'w-full mt-4 flex items-end '}>
                  <div className={styles.divider} />
                  <div className={'ml-4 mr-2 ' + styles.byText}>by</div>
                  <div className={styles.subTitle}>CRYS DYAZ</div>
                </div>
                <div className={styles.text}>
                  La unidad de mujer de Crys Dyaz & Co está formada por fisioterapeutas y entrenadoras especializadas en
                  el cuidado integral de la mujer en todas las etapas de su vida.
                  <br />
                  <br />
                  Desde el dolor perineal en relaciones sexuales o debilidad de suelo pélvico en el entrenamiento, hasta
                  el acompañamiento en el embarazo, preparación al parto, postparto y menopausia.
                  <br />
                  En Crys Dyaz & CO defendemos la importancia de cuidarse desde dentro para sentirse fuerte y segura por
                  fuera.
                </div>
              </div>
            </div>
            <div className={'col-span-7 flex justify-end z-10'}>
              <CircularMark />
            </div>
          </div>
        </div>
        {/* continue browsing part */}
        <div className={globalStyles.container + ' absolute bottom-0'}>
          <div
            className={'absolute bottom-0 block jusity-center cursor-pointer right-10 '}
            onClick={() => handleGotoDiscipline()}
          >
            <div className={styles.continueBrowsing}>Seguir navegando</div>
            <Image src={StarGroup} alt="" width={29} height={64} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSection

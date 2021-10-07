import React from 'react'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'components/FemaleHealth/MainSection.module.scss'

const MainSection = () => {
  return (
    <div className={'w-full p-0'}>
      <div className={'w-full p-0 m-0 h-screen -z-10 flex justify-center ' + styles.container}>
        <div className={globalStyles.container + ' pb-7'}>
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
            <div className={'col-span-7'}>Carousel part</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSection

import React from 'react'

// next components
import Image from 'next/image'

// images and icons
import PlansImage from 'assets/images/plans_online.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './NoPlansOnlineDialog.module.scss'

const NoPlansOnlineDailog = props => {
  // variables
  const { viewport } = props
  return (
    <div className={styles.imageContainer}>
      <div className={''}>
        <Image src={PlansImage} alt={''} width={274} height={226} />
      </div>
      <div className={styles.title + ' mt-20'}>ESTAMOS PREPARANDO TU PLAN ONLINE PERSONALIZADO</div>
      <div className={'flex justify-center planonline_text'}>
        <div className={globalStyles.container}>
          <div className={styles.planonline_text}>
            <p className="mt-20">Recuerda:</p>
            <ol>
              <li>
                <span className="font-bold">1. Rellenar el cuestionario inicial.</span>
                Encontrarás cómo acceder a él desde tu dashboard.
              </li>
              <li>
                <span className="font-bold">
                  2. Introduce tus <span className="font-bold">datos antropométricos</span> en tu perfil.
                </span>
              </li>
            </ol>
            <p className="mt-5"></p>
            <p className="mt-5">
              Una vez lo hayas cumplimentado, en un plazo de 48/72h laborables recibirás tu plan mensual.
            </p>

            <p className="mt-5">
              El siguiente paso será fijar una videollamada a través de la web para resolver todas las posibles dudas
              que te hayan surgido al revisarlo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoPlansOnlineDailog

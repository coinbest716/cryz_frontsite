import PrimaryLayout from 'components/Layout/PrimaryLayout'

// components
import MainSection from 'components/FemaleHealth/MainSection'

import styles from 'pages/female-health/FemaleHealth.module.scss'

const FemaleHealth = () => {
  return (
    <div className={styles.container}>
      <MainSection />
    </div>
  )
}
export default FemaleHealth

FemaleHealth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

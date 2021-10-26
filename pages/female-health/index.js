import PrimaryLayout from 'components/Layout/PrimaryLayout'

// components
import MainSection from 'components/FemaleHealth/MainSection'
import DisciplineSection from 'components/FemaleHealth/DisciplineSection'

import styles from 'pages/female-health/FemaleHealth.module.scss'

const FemaleHealth = () => {
  return (
    <div className={styles.container}>
      <MainSection />
      <div id="discipline" className="w-full flex justify-center">
        <DisciplineSection />
      </div>
    </div>
  )
}
export default FemaleHealth

FemaleHealth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

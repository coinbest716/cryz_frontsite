import PrimaryLayout from 'components/Layout/PrimaryLayout'

// components
import MainSection from 'components/Home/MainSection'
import TeamSection from 'components/Home/TeamSection'
import COSection from 'components/Home/COSection'
import styles from 'styles/Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <MainSection />
      <div id="team" />
      <TeamSection />
      <COSection />
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

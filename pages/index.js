import React from 'react'
import { useDispatch } from 'react-redux'

// components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import MainSection from 'components/Home/MainSection'
import TeamSection from 'components/Home/TeamSection'
import COSection from 'components/Home/COSection'

// styles
import styles from 'styles/Home.module.scss'

const Home = props => {
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
  return (
    <div className={styles.container}>
      <MainSection />
      <div id="team" className={'w-full h-10'} />
      <TeamSection />
      <COSection />
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

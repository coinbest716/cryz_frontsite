import React from 'react'
import { useSelector } from 'react-redux'

// third party components
import ReactLoading from 'react-loading'

// custom components
import MobileDashboardHeader from 'components/Header/MobileDashboardHeader'
import MobileDashboardFooter from 'components/Footer/MobileDashboardFooter'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'

const MobileDashboardLayout = ({ title, children }) => {
  const isLoading = useSelector(state => state.isLoading)
  return (
    <>
      <MobileDashboardHeader title={title} />
      <main>{children}</main>
      <MobileDashboardFooter />
      {isLoading && (
        <div className={globalStyles.loadingArea}>
          <div className={globalStyles.loading}>
            <ReactLoading type={'spinningBubbles'} color="#006600" />
          </div>
        </div>
      )}
    </>
  )
}

export default MobileDashboardLayout

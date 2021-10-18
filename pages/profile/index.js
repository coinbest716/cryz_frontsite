import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './profile.module.scss'
import Image from 'next/image'

const Profile = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Profile</div>
        </div>
      </div>
    </div>
  )
}
export default Profile

Profile.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}

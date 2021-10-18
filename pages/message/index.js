import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './message.module.scss'
import Image from 'next/image'

const Message = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Message</div>
        </div>
      </div>
    </div>
  )
}
export default Message

Message.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}

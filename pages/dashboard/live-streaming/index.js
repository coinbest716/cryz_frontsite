import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './LiveStreaming.module.scss'

const LiveStreaming = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">LiveStreaming</div>
    </div>
  )
}
export default LiveStreaming

LiveStreaming.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}

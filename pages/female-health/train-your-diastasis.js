import PrimaryLayout from 'components/Layout/PrimaryLayout'

const TrainYourDiastasis = () => {
  return <div>TrainYourDiastasis</div>
}
export default TrainYourDiastasis

TrainYourDiastasis.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

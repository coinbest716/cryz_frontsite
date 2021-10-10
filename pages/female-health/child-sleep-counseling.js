import PrimaryLayout from 'components/Layout/PrimaryLayout'

const ChildSleepCounseling = () => {
  return <div>ChildSleepCounseling</div>
}
export default ChildSleepCounseling

ChildSleepCounseling.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

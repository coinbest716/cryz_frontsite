import PrimaryLayout from 'components/Layout/PrimaryLayout'

const LactationCounseling = () => {
  return <div>LactationCounseling</div>
}
export default LactationCounseling

LactationCounseling.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

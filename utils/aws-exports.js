/* eslint-disable */

const awsmobile = {
  aws_project_region: 'eu-west-1',
  aws_cognito_identity_pool_id: 'eu-west-1:05691e35-c0ca-4ef3-b110-41e465b5bbd3',
  aws_cognito_region: 'eu-west-1',
  aws_user_pools_id: 'eu-west-1_ROccQJdE0',
  aws_user_pools_web_client_id: '1p091ur8eg145p97qt8c0j9d04',
  oauth: {
    domain: 'https://cryzdyazfrontend.auth.eu-west-1.amazoncognito.com',
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
}

export default awsmobile

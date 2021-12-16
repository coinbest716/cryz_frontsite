/* eslint-disable */

const awsmobile = {
  aws_project_region: 'eu-west-1',
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: 'eu-west-1',
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
}

export default awsmobile

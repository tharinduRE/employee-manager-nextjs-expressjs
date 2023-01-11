
import { NextPageContext } from 'next'
import NextErrorComponent from 'next/error'
import logger from '../config/logger'

const CustomErrorComponent = (props: { statusCode: any }) => (
  <NextErrorComponent statusCode={props.statusCode} />
)

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
//   await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  logger.error(`Error on Page : ${contextData.asPath}`)
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
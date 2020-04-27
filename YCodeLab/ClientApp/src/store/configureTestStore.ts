import { createBrowserHistory } from 'history'
import { Middleware } from 'redux'
import configureStore from './configureStore'
import { ApplicationState } from '.'
import Stethoscope from '../testUtility/stethoscope'

const baseUrl = 'https://test/'

export default function configureTestStore(
  initialState?: ApplicationState
) {
  const history = createBrowserHistory({ basename: baseUrl })
  const stethoscope = new Stethoscope();
  return {
    testStore: configureStore(history, initialState, [ stethoscope.asMiddleware() ]),
    stethoscope,
  }
}

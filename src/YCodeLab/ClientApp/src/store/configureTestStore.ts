import configureStore from './configureStore'
import { ApplicationState } from '.'
import Stethoscope from '../testUtility/stethoscope'

const baseUrl = 'https://test/'

export default function configureTestStore(
  initialState?: ApplicationState
) {
  const stethoscope = new Stethoscope();
  return {
    testStore: configureStore(initialState, [ stethoscope.asMiddleware() ]),
    stethoscope,
  }
}

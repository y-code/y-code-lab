import * as enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { enableFetchMocks } from 'jest-fetch-mock';

enzyme.configure( { adapter: new EnzymeAdapter() });

enableFetchMocks();
fetchMock.dontMock();

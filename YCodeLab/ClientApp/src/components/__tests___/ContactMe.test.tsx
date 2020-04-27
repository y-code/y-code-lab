import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ContactMe from '../ContactMe';
import * as store from '../../store';
import { actions } from '../../store/Messaging';
import configureTestStore from '../../store/configureTestStore';

export default describe('Contact ME page', () => {
  beforeAll(() => {
    fetchMock.mockIf(/^\/api\/Messaging\/Messages(\?.*)?$/, async req => {
      console.log(`Mocking fetch from '${req.url}'`);
      return {
        status: 200,
        body: JSON.stringify({ message: 'This is mocked success response.' }),
      };
    });
  });

  it('can submit a form.', async () => {
    const { testStore, stethoscope } = configureTestStore();

    let wrapper = mount(
      <Provider store={testStore}>
        <ContactMe />
      </Provider>
    );

    let senderName = wrapper.find('input#senderName');
    (senderName.instance() as any)['value'] = "test";
    senderName.simulate('change');

    let unsubscribe = stethoscope.subscribe(
      actions.receiveSaveMessageResult({} as store.SaveMessageResult).type,
      result => {
        wrapper.update()
        let senderName = wrapper.find('input#senderName')
        expect(senderName.exists()).toBeFalsy()
      }
    );

    wrapper.find('button#sendButton').simulate('click');

    await stethoscope.listen();
  });
});

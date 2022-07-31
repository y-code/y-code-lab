import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import './SJPrivacyPolicy.scss';
import { RoutingProps } from '../../App';

class SJPrivacyPolicy extends React.Component<RoutingProps> {

  goTo(path: string) {
    if (this.props.navigate)
      this.props.navigate(path);
  }

  render () {
    return (
      <div className='privacy-policy-page'>

        <div className='table-of-contents'>
          <Container>

            <h1>Privacy Policy</h1>

            <ul className="h2">
              <li>
                <img src="/icon-power-maniac.png" alt="Power Maniac Icon" style={{ margin: 10, height: 18 }}/>
                <a href="/strawberry-joystick/privacy-policy#power-maniac">Privacy Policy for Power Maniac</a>
              </li>
              <li>
                <a href="/strawberry-joystick/privacy-policy#update-history">Update History</a>
              </li>
            </ul>

          </Container>
        </div>

        <a className="anchor" id="power-maniac"/>

        <div className='page-section page-section-power-maniac'>
          <Container>

            <h2>
              <img src="/icon-power-maniac.png" alt="Power Maniac Icon" style={{ margin: 12, height: 24 }}/>
              Strawberry Joystick Privacy Policy for Power Maniac
            </h2>

            <p/>

            <p>
              This privacy policy governs your use of the software application Power Maniac (“Application”) for mobile devices that was created by Strawberry Joystick. The Application is a single-player 2D shooter video game. It assumes that who plays on a single installation of the Application is always the same player, and it never identifies the game players. The player obtains and can accumulate in-game money in the Application, and can use it to purchase and collect avatars` abilities and items. The score obtained in the game is kept in the Application only when it is higher than the last highest score. The scores, the in-game money, the avatars’ abilities, and the items in the Application are only valid in the single installation and cannot be shared or transferred to the other installations even if that is on the same device. It is never possible to exchange any of those for any currencies. They all will be lost once the Application is uninstalled from a device, and there is no way to recover the in-game data.
            </p>

            <h3>What information does the Application obtain and how is it used?</h3>

            <h4>User Provided Information</h4>

            <p>
              The Application does not require any registrations and does not obtain any information from you when you download and play on the Application.
            </p>

            <h4>Automatically Collected Information</h4>

            <p>
              The Application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device's unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application. All of these are collected and used by the functionalities provided by Unity Ads. Please refer to Unity`s privacy policy at <a href="https://unity3d.com/legal/privacy-policy" target="_blank">https://unity3d.com/legal/privacy-policy</a> for more details.
            </p>

            <h3>Does the Application collect precise real time location information of the device?</h3>

            <p>
              This Application does not collect precise information about the location of your mobile device.
            </p>

            <h3>Do third parties see and/or have access to information obtained by the Application?</h3>

            <p>
              The data collected by the Application is only used for Unity Ads. Please refer to Unity`s privacy policy at <a href="https://unity3d.com/legal/privacy-policy" target="_blank">https://unity3d.com/legal/privacy-policy</a> for more details.
            </p>

            <h3>What are my opt-out rights?</h3>

            <p>
              You can stop all collection of information by the Application easily by uninstalling the Application. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
            </p>

            <h4>Data Retention Policy, Managing Your Information</h4>

            <p>
              We will retain Automatically Collected information based on Unity`s privacy policy. Please refer to it about the retention period at <a href="https://unity3d.com/legal/privacy-policy" target="_blank">https://unity3d.com/legal/privacy-policy</a>.
            </p>

            <h4>Children</h4>

            <p>
              We do not use the Application to knowingly solicit data from or market to children under the age of 13. If a parent or guardian becomes aware that his or her child has provided us with information without their consent, he or she should contact us at <a href="mailto:igeorgetv@gmail.com">igeorgetv@gmail.com</a>. We will delete such information from our files within a reasonable time.
            </p>

            <h4>Changes</h4>

            <p>
              This Privacy Policy may be updated from time to time for any reason. We will notify you of any changes to our Privacy Policy by posting the new Privacy Policy here. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes. You can check the history of this policy by clicking here.
            </p>

            <h3>Your Consent</h3>

            <p>
              By using the Application, you are consenting to our processing of your information as set forth in this Privacy Policy now and as amended by us. "Processing,” means using cookies on a computer/hand held device or using or touching information in any way, including, but not limited to, collecting, storing, deleting, using, combining and disclosing information, all of which activities will take place in New Zealand. If you reside outside New Zealand your information will be transferred, processed and stored there under New Zealand privacy standards.
            </p>

            <h3>Contact us</h3>

            <p>
              If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us via email at <a href="mailto:igeorgetv@gmail.com">igeorgetv@gmail.com</a>.
            </p>

          </Container>
        </div>

        <a className="anchor" id="update-history"/>

        <div className='page-section page-section-update-history'>
          <Container>

            <h2>Update History</h2>

            <p>
              <ul>
                <li>01/08/2022</li>
                <p>Privacy Policy for Power Maniac was initially published.</p>
              </ul>
            </p>

          </Container>
        </div>

      </div>
    );
  }
}

export default connect()(SJPrivacyPolicy);

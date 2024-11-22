import { Button, Container } from 'reactstrap';
import styles from './strawberry-joystick.module.scss'
import { useRoutingHooks, RoutingProps } from '@ycode-lab/common';

interface Props extends RoutingProps {}

export function _SJPrivacyPolicy(props: Props) {
  return (
    <div className={styles['sj-home']}>
      <Container>
        <h1>Welcome to StrawberryJoystick!</h1>
        <Button>Test</Button>
      </Container>
    </div>
  );
}

export const SJPrivacyPolicy = (props: Props) => <_SJPrivacyPolicy {...useRoutingHooks(props)}/>;

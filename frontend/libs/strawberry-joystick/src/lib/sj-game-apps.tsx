import { Button, Container } from 'reactstrap';
import styles from './strawberry-joystick.module.scss'
import { useRoutingHooks, RoutingProps } from '@ycode-lab/common';

interface Props extends RoutingProps {}

export function _SJProjects(props: Props) {
  return (
    <div className={styles['sj-projects']}>
      <Container>
        <h1>Welcome to StrawberryJoystick!</h1>
        <Button>Test</Button>
      </Container>
    </div>
  );
}

export const SJProjects = (props: Props) => <_SJProjects {...useRoutingHooks(props)}/>;

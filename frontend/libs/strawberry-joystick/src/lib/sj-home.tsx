import { Button, Container, Row } from 'reactstrap';
import { useRoutingHooks, RoutingProps } from '@ycode-lab/common';
import styles from './strawberry-joystick.module.scss'

const categories = [
  {
    name: 'Game Apps',
    imgSrc: '/assets/blender-unity-icon.gif',
    imgStyle: 'sj-home-site-category-blender-unity-icon',
    goto: '/strawberry-joystick/projects',
  },
];

interface Props extends RoutingProps {}

export function _SJHome(props: Props) {

  const goTo = (path: string) => () => {
    if (props.navigate)
      props.navigate(path);
  }

  return (
    <div className={styles['sj-home']}>
      <h1>Strawberry Joystick</h1>
      <Container className={styles['sj-home-intro-container']}>
      </Container>

      <Container className={styles['sj-home-site-category-container']}>
        <Row className='justify-content-center'>
          {
            categories.map(category => {
              return <Button color='secondary' outline className='d-flex justify-content-center align-items-center' onClick={goTo(category.goto)}>
                <img className={styles[category.imgStyle]} src={category.imgSrc}/>
                <h2 className='site-category-name'>{category.name}</h2>
              </Button>
            })
          }
        </Row>
      </Container>
    </div>
  );
}

export const SJHome = (props: Props) => <_SJHome {...useRoutingHooks(props)}/>;

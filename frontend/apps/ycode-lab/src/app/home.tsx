import { Link } from 'react-router-dom';
import { Button, Container, Row } from 'reactstrap';
import styles from './app.module.scss';
import { RoutingProps, useRoutingHooks } from '@ycode-lab/common';

interface Props extends RoutingProps {}

function _Home(props: Props) {

  const goTo = (path: string) => {
    if (props.navigate)
      props.navigate(path);
  }

  const categories = [
    {
      name: 'My Projects',
      imgSrc: '/assets/happyfl-big.png',
      imgStyle: '',
      onClick: () => goTo('/my-projects'),
    },
    // {
    //   name: 'Contributions in 3rd Party',
    //   imgSrc: '/assets/contributions-in-3rd-party-icon.png',
    //   imgStyle: '',
    //   onClick: () => goTo('/contributions-in-3rd-party'),
    // },
    {
      name: 'Video Game Developments',
      imgSrc: '/assets/blender-unity-icon.gif',
      imgStyle: 'home-site-category-blender-unity-icon',
      onClick: () => goTo('/video-game-devs'),
    },
    {
      name: 'Technical Writings',
      imgSrc: '/assets/code-project-icon.png',
      imgStyle: '',
      onClick: () => goTo('/tech-writings'),
    },
  ];

  return (
    <div className={styles['home']}>
      <h1>Y-code Lab</h1>
      <Container className={styles['home-intro-container']}>
        <p>Welcome to Yas's Lab! It is a place I showcase my works. Please feel free to look around. I would be grateful if you could <Link to="/contact-me">leave a comment.</Link></p>
      </Container>

      <Container className={styles['home-site-category-container']}>
        <Row className='justify-content-center'>
          {
            categories.map(category => {
              return <Button color='secondary' outline className='d-flex justify-content-center align-items-center' onClick={category.onClick}>
                <img className={styles[category.imgStyle]} src={category.imgSrc}/>
                <h2 className='site-category-name'>{category.name}</h2>
              </Button>
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export const Home = (props: Props) => <_Home {...useRoutingHooks(props)}/>;
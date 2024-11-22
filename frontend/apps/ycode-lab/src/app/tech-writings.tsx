import React from 'react';
import { Container } from 'reactstrap';
import { requestTechWritingsAsync, RoutingProps, useAppDispatch, useAppSelector, useRoutingHooks } from '@ycode-lab/common';
import styles from './app.module.scss';

interface Props extends RoutingProps {}

function _Techwritings(props: Props) {
  const writings = useAppSelector(state => state.techWriting.writings.data);
  const isLoading = useAppSelector(state => state.techWriting.writings.isLoading);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(requestTechWritingsAsync());
  }, [dispatch]);

  return (
    <div className={styles['tech-writings']}>
      <h1>Technical Writings</h1>
      <Container className={styles['tech-writings-intro-container']}>
        <p>
          I sometimes have time to write an article. I've been helped many times by people through their sharing of knowledge, discoveries, and experiences, and I decided to repay the bits of help I've received from society. In recent years, I have left my discoveries in public when I discovered something through my software development works.
        </p>
        <p>
          I'm actively writing articles on CodeProject.com. The following are the articles I've ever published on the website.
        </p>
      </Container>
      {
        !writings ? [] : writings.map(w =>
          <div className={styles['tech-writing-item']}>
            <Container>
              <div>
                <h3>
                  <a href={w.url} target="_blank">
                    {w.title}
                    <img src="https://img.icons8.com/metro/26/000000/external-link.png" style={{width: 20, marginLeft: 10}}></img>
                  </a>
                </h3>
                <div className="writing-props-row">
                  {/*
                  <Rating rate={w.rating} votes={w.votes} className="col-6 col-lg-3 col-xl-2"/>
                  <div className="col-6 col-lg-2">Views: {this._formatter.format(w.views)}</div>
                  */}
                  <div className="col-12 col-lg-4">Publish Date: {w.publishedDate}</div>
                </div>
              </div>
              <div>
                {w.summary}
              </div>
            </Container>
          </div>
        )
      }
    </div>
  )
}

export const TechWritings = (props: Props) => <_Techwritings {...useRoutingHooks(props)}/>;

import React from 'react';
import { Col, Container, Row, Tooltip } from 'reactstrap';
import styles from "./app.module.scss";

export function FooterTop() {
  return (
    <Container className='text-end text-light'>
      &copy;Y-code
    </Container>
  );
}

export function FooterContent() {
  const [ isStackOverflowIconTooltipOpen, setIsStackOverflowIconTooltipOpen ] = React.useState(false);
  const [ isGitHubTooltipOpen, setIsGitHubTooltipOpen ] = React.useState(false);

  return (
    <Container>
      <Row>
        <Col sm={12} md={4} lg={3} xl={3} xxl={3}>
          <div className={'text-center ' + styles['footer-profile-img-col']}>
            <img className='profile-img' src='/assets/profile-img.jpg'/>
            <h2 className='text-light'>Yas Ikeda</h2>
          </div>
        </Col>
        <Col sm={12} md={8} lg={6} xl={6} xxl={6}>
          <p>
            I'm a Software Engineer experienced in enterprise system development. I'm most skilled in web system development and enjoy video game development in my spare time.
          </p>
          <div>
            While I love coding, I am keenly interested in designing and developing quality systems effectively and efficiently. While documentation is essential in development processes, its management and maintenance are time-consuming and thus costly for businesses. Through past experiments in enterprise projects, I have found that UML and ArchiMate are cost-effective while encouraging and aiding discussions and communications well. These days, I'm using some utilities from TOGAF to make feature design and implementation planning profitable.
          </div>
        </Col>
        <Col sm={12} md={12} lg={3} xl={3} className='profile-content-col text-light'>
          <Row>
            <Col sm={6} md={6} lg={12} xl={12} className="text-center">
              <div className="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="yasuikeda">
                <a className="LI-simple-link" href='https://nz.linkedin.com/in/yasuikeda?trk=profile-badge'>Yasunori Ikeda</a>
              </div>
            </Col>
            <Col sm={6} md={6} lg={12} xl={12}>
                <Row style={{ paddingTop: "20px" }} className="align-items-center">
                  <Col xs={12} sm={12} md={12} className="text-center" style={{ marginBottom: "20px" }}>
                      <a id="stack-overflow-badge" href="https://stackoverflow.com/users/9195902/yas-ikeda" target="_blank">
                        <img src="https://stackoverflow.com/users/flair/9195902.png" width="208" height="58" alt="profile for Yas Ikeda at Stack Overflow, Q&amp;A for professional and enthusiast programmers" title="profile for Yas Ikeda at Stack Overflow, Q&amp;A for professional and enthusiast programmers" />
                      </a>
                      <Tooltip target="stack-overflow-badge"
                                placement="bottom"
                                isOpen={isStackOverflowIconTooltipOpen}
                                toggle={() => setIsStackOverflowIconTooltipOpen(!isStackOverflowIconTooltipOpen)}
                      >
                        My Profile in Stack Overflow
                      </Tooltip>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-center">
                    <a id="github-badge" href="https://github.com/y-code" target="_blank">
                        <img src="/assets/GitHub-Mark-Light-120px-plus.png"/>
                    </a>
                    <Tooltip target="github-badge"
                                placement="bottom"
                                isOpen={isGitHubTooltipOpen}
                                toggle={() => setIsGitHubTooltipOpen(!isGitHubTooltipOpen)}
                      >
                        My Profile in GitHub                          </Tooltip>
                  </Col>
                </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

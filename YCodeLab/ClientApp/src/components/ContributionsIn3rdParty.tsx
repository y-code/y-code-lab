import React from "react";
import { Row, Col, Badge, Container } from "reactstrap";

import './ContributionsIn3rdParty.scss';
import bgImg from './tpl-frame.svg';
import bgImg2 from './GitHub-Mark-120px-plus.png';
import bgImg3 from './rip.svg';

import linkInjector from '../utilities/linkInjector';
import { HashLink } from "react-router-hash-link";

interface Props {
}
interface State {
  thirdPartyLib: { items: ThirdPartyLibItem[] }
}

interface ThirdPartyLibItem {
  id: string,
  libName: string,
  logo: string,
  items: Array<{
    id: string,
    actionType: ('bug fix'|'enhancement'|'improvement'|'doc'),
    status: string,
    title: string,
    description: string[],
    links: { [key:string]: string },
  }>
}

export default class ThirdPartyLibDevs extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      thirdPartyLib: {
        items: [
          {
            id: 'ef-core-bug-fix',
            libName: 'dotnet/efcore',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/64px-.NET_Core_Logo.svg.png',
            items: [
              {
                id: 'ef-core-bug-fix-0',
                actionType: 'bug fix',
                status: 'released in .NET Core 3.0.0-preview6',
                title: 'scaffold-DbContext not adding schema parameter to modelBuilder.HasSequence',
                description: [
                  'DB context scaffold did not generate modelBuilder.HasSequence method call with a schema parameter in DbContext\'s OnModelCreating method.',
                  'I fixed the condition in CSharpDbContextGenerator.GenerateSequence to correctly append schema parameter to sequence creation code when the sequence\'s schema is provided. I raised the issue in #15513 and fixed in #15514. It\'s been released in .NET Core 3.0.0-preview6',
                ],
                links: {
                  '#15513': 'https://github.com/dotnet/efcore/issues/15513',
                  '#15514': 'https://github.com/dotnet/efcore/pull/15514',
                  '.NET Core 3.0.0-preview6': 'https://github.com/dotnet/efcore/releases/tag/release%2F3.0',
                },
              },
            ],
          },
          {
            id: 'npgsql-enhancement',
            libName: 'npgsql/npgsql',
            logo: 'https://avatars2.githubusercontent.com/u/5766497?s=200&v=4',
            items: [
              {
                id: 'npgsql-enhancement-0',
                actionType: 'enhancement',
                status: 'open',
                title: 'support connect URI',
                description: [
                  'When I tried to host my ASP.Net Core app on AppHarbor, I found that ElephantSQL add-on provides a connection URI for PostgreSQL database connection. It was a problem because Npgsql does not support connection URI.',
                  'It seems to be quite common among PaaS services that integrated PostgreSQL services provide connection URI instead of connection string, so it was surprising for me to find it not acceptable in Npgsql. The issue has already been raised in GitHub since August 2018 in #2090, but it has not been solved yet. Although one contributor committed a pull request against the issue in the past in #2512, it was not a complete implementation.',
                  'After reading through the comments and changes in #2090 and #2512, I noticed that this feature requires much more effort and that the approach in #3512 does not work in some cases. Besides, when I found the pull request, it looked not active. The comments on its code review had not been answered for more than three months. Therefore, I decided to solve it myself and provided the solution in a separate pull request in #2733.',
                ],
                links: {
                  '#2733': 'https://github.com/npgsql/npgsql/pull/2733',
                  '#2090': 'https://github.com/npgsql/npgsql/issues/2090',
                  'AppHarbor': 'https://appharbor.com/',
                  '#2512': 'https://github.com/npgsql/npgsql/pull/2512',
                },
              },
            ],
          },
          {
            id: 'bootstrap-combobox-enhancement',
            libName: 'danielfarrell/bootstrap-combobox',
            logo: 'https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg',
            items: [
              {
                id: 'bootstrap-combobox-enhancement-0',
                actionType: 'enhancement',
                status: 'released in 1.2.0',
                title: 'support Bootstrap 4',
                description: [
                  'When I used bootstrap-combobox with Bootstrap 4, the combo-box looked not good, where the caret icon appeared outside the input. Besides, there was a malfunction when Popper.js is referenced.',
                  'The layout broke because Glyphicons was taken off in Bootstrap 4. It needed to get rid of the dependency on Glyphicons and to be able to work with any other font.',
                  'The combo-box behaved a little differently when a web page also refers to Popper.js. Some Bootstrap 4 components rely on the library, so the bootstrap-combobox should work the same with or without Popper.js.',
                  'I fixed those two in #263, and it was released in bootstrap-combobox 1.2.0.',
                ],
                links: {
                  '#263': 'https://github.com/danielfarrell/bootstrap-combobox/pull/263',
                  'bootstrap-combobox 1.2.0': 'https://github.com/danielfarrell/bootstrap-combobox/releases/tag/1.2.0',
                },
              },
            ],
          },
          {
            id: 'hap-improvement',
            libName: 'zzzprojects/html-agility-pack',
            logo: 'https://z2c2b4z9.stackpathcdn.com/images/logo256X256.png',
            items: [
              {
                id: 'hap-improvement-0',
                actionType: 'improvement',
                status: 'open',
                title: 'Handle not supported content encoding',
                description: [
                  'Html Agility Pack (HAP) is a library I use in this web site and my web application, HappyFL. This library helps seeking data from HTML documents provided on the web. In this web site, I use it to get some information from Code Project web site in Technical Writings page because its REST API does not provide enough information I need.',
                  'While using HAP in HappyFL, I found that the library throws an exception when loading a page from a specific recipe web site. Checking the response header, I noticed that the web site responds with a header which breaches HTTP protocol, and HAP failed to solve the encoding scheme as a result.',
                  'Fortunately, HAP can overwrite the encoding scheme to read responses, and I tried it. However, the feature did not help in this case. I read the code in HAP, and found that it is possible to make the encoding overwrite work even in such case. So, I modified the code and committed it with some more test code in pull request #327.',
                ],
                links: {
                  'HappyFL': 'http://happyfl.apphb.com/',
                  'Technical Writings page': 'https://y-code-lab.herokuapp.com/tech-writings',
                  '#326': 'https://github.com/zzzprojects/html-agility-pack/issues/326',
                  '#327': 'https://github.com/zzzprojects/html-agility-pack/pull/327',
                },
              },
            ],
          },
          {
            id: 'reactstrap-doc',
            libName: 'reactstrap/reactstrap',
            logo: 'https://reactstrap.github.io/assets/logo.png',
            items: [
              {
                id: 'reactstrap-doc-0',
                actionType: 'doc',
                status: 'released',
                title: 'correct broken links',
                description: [
                  'When I was reading the documentation, I noticed a broken link and an inconsistent command between reactstrap doc and create-react-app doc. Therefore, I committed some updates in #1494.',
                ],
                links: {
                  'reactstrap doc': 'https://reactstrap.github.io/',
                  '#1494': 'https://github.com/reactstrap/reactstrap/pull/1494',
                },
              },
            ],
          },
          {
            id: 'rabbitmq-doc',
            libName: 'rabbitmq/rabbitmq-website',
            logo: 'https://cdn.worldvectorlogo.com/logos/rabbitmq.svg',
            items: [
              {
                id: 'rabbitmq-doc-0',
                actionType: 'doc',
                status: 'released',
                title: 'correct directory paths in instruction for macOS',
                description: [
                  'When I was playing with rabbitmq in my macOS, I noticed a couple of paths in the instruction for macOS were different from what I could see. So, I corrected it in #731.',
                ],
                links: {
                  'the instruction for macOS': 'https://www.rabbitmq.com/install-homebrew.html',
                  '#731': 'https://github.com/rabbitmq/rabbitmq-website/pull/731',
                },
              },
            ],
          },
        ]
      }
    };
  }

  private escapeRegExp(original:string) : string {
    return original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  render() {
    return (
      <div className="page-contributions-in-3rd-party">
        <div className="table-of-contents">
          <h1>Contributions in Third-Party Software</h1>
          <ul className="h2">
            {
              (() => {
                let items: Array<JSX.Element> = [];
                if (this.state && this.state.thirdPartyLib && this.state.thirdPartyLib.items && this.state.thirdPartyLib.items.length) {
                  for (let i of this.state.thirdPartyLib.items) {
                    items.push(<li key={`h2-${i.id}`}><HashLink to={`#${i.id}`}>{i.libName}</HashLink></li>);
                    items.push(
                      <ul key={`h3-items-${i.id}`} className="h3">
                        {
                          i.items.map(i2 => (
                            <li key={`h3-${i2.id}`}>{i2.title}</li>
                          ))
                        }
                      </ul>
                    );
                  }
                }
                return items;
              })()
            }
          </ul>
        </div>
        <div className="page-section">
          {
            (() => {
              let items: Array<JSX.Element> = [];
              if (this.state && this.state.thirdPartyLib && this.state.thirdPartyLib.items && this.state.thirdPartyLib.items.length)
                for (let i of this.state.thirdPartyLib.items) {
                  items.push(<a key={`anchor-${i.id}`} className="anchor" id={i.id} />)
                  items.push(
                    <div key={`item-${i.id}`} className='page-section'>
                      <Container>
                        <Row key={`item-header-${i.id}`}>
                          <Col md={12} lg={2} className="col-logo">
                            <img className='logo' src={i.logo} />
                          </Col>
                          <Col md={12} lg={10}>
                            <h2>{i.libName}</h2>
                          </Col>
                        </Row>
                        {
                          i.items.map(item => (
                            <Row key={`subitem-${i.id}-${item.id}`}>
                              <Col md={0} lg={2}>
                              </Col>
                              <Col md={12} lg={10}>
                                <Badge color="primary">{item.actionType}</Badge>
                                <Badge color="info">{item.status}</Badge>
                                <h3>{item.title}</h3>
                                {
                                  item.description.map((d, i) =>
                                    <p key={`description-${item.id}-${i}`}>
                                      {linkInjector.inject([ d ], item.links)}
                                    </p>
                                  )
                                }
                                <small className='links'>
                                  {(() => {
                                    let items: Array<JSX.Element> = [];
                                    if (item.links)
                                      for (var l in item.links)
                                        items.push(<div key={`link-${item.id}-${l}`}>{l}: <a href={item.links[l]}>{item.links[l]}</a></div>)
                                    return items;
                                  })()}
                                </small>
                              </Col>
                            </Row>
                          ))
                        }
                      </Container>
                    </div>
                  );
                }
              return items;
            })()
          }
        </div>
      </div>
    );
  }
}
import * as React from 'react';
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import { Rating } from './Rating';

import './TechWritings.scss';
import * as CodeProjectApi from '../store/CodeProjectApi';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

class TechWritings extends React.PureComponent<
    { codeProjectApi: CodeProjectApi.CodeProjectApiState } & typeof CodeProjectApi.actionCreators,
    { }> {
  private _formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US');
  
  public componentDidMount() {
    this.ensureDataFetched();
  }

  public componentDidUpdate() {
    // this.ensureDataFetched();
  }

  private ensureDataFetched() {
    (this.props as typeof CodeProjectApi.actionCreators).requestGetMyArticles();
    (this.props as typeof CodeProjectApi.actionCreators).requestGetMyBlogPosts();
    (this.props as typeof CodeProjectApi.actionCreators).requestGetMyTips();
  }

  aggregateWritingInfoArray<T>(
      data: WritingInfo[],
      additionalData: T[],
      getUrl: (d: T) => string,       getTitle: (d: T) => string,
      getSummary: (d: T) => string,   getRating: (d: T) => number,
      getVotes: (d: T) => string,     getViews: (d: T) => string,
      getPublishedDate: (d: T) => string) : WritingInfo[] {
    return [
      ...data,
      ...additionalData.map(a => ({
        url: getUrl(a),         title: getTitle(a), summary: getSummary(a),
        rating: getRating(a),   votes: getVotes(a), views: getViews(a),
        publishedDate: getPublishedDate(a),
      } as WritingInfo))
    ];
  }

  aggregateWritingInfoArrayWithArticles(data: WritingInfo[], additionalData: CodeProjectApi.CodeProjectArticle[]){
    return this.aggregateWritingInfoArray<CodeProjectApi.CodeProjectArticle> (
      data,                     additionalData,
      d => d.link,              d => d.title,   d => d.summary,
      d => d.rating as number,  d => d.votes,   d => d.views,
      d => d.modifiedDate,
    );
  }

  aggregateWritingInfoArrayWithBlogPosts(data: WritingInfo[], additionalData: CodeProjectApi.CodeProjectBlogPost[]){
    return this.aggregateWritingInfoArray<CodeProjectApi.CodeProjectBlogPost> (
      data,                     additionalData,
      d => d.link,              d => d.title,   d => d.summary,
      d => d.rating as number,  d => d.votes,   d => d.views,
      d => d.modifiedDate,
    );
  }

  aggregateWritingInfoArrayWithTips(data: WritingInfo[], additionalData: CodeProjectApi.CodeProjectTip[]){
    return this.aggregateWritingInfoArray<CodeProjectApi.CodeProjectTip> (
      data,                     additionalData,
      d => d.link,              d => d.title,   d => d.summary,
      d => d.rating as number,  d => d.votes,   d => d.views,
      d => d.modifiedDate,
    );
  }

  public render() {
    let data: WritingInfo[] = [];
    let cards: JSX.Element[];

    if (this.props.codeProjectApi.myArticles.isLoading
      || this.props.codeProjectApi.myBlogPosts.isLoading
      || this.props.codeProjectApi.myTips.isLoading) {
      
      cards = [ <Col className="col-center"><img src="/bean-eater-1s-200px.png"/></Col> ];

    } else {

      if (this.props.codeProjectApi
          && this.props.codeProjectApi.myArticles
          && this.props.codeProjectApi.myArticles.result)
          data = this.aggregateWritingInfoArrayWithArticles(data, this.props.codeProjectApi.myArticles.result);

      if (this.props.codeProjectApi
          && this.props.codeProjectApi.myBlogPosts
          && this.props.codeProjectApi.myBlogPosts.result)
          data = this.aggregateWritingInfoArrayWithBlogPosts(data, this.props.codeProjectApi.myBlogPosts.result);

      if (this.props.codeProjectApi
          && this.props.codeProjectApi.myTips
          && this.props.codeProjectApi.myTips.result)
          data = this.aggregateWritingInfoArrayWithTips(data, this.props.codeProjectApi.myTips.result);

      cards = data.map(w => (
        <Col lg={6}>
          <Card>
            <CardHeader>
              <h3><a href={w.url}>{w.title}</a></h3>
              <div className="writing-props-row">
                <Rating rate={w.rating} votes={w.votes} className="col-6 col-lg-6 col-xl-6"/>
                <div className="col-6 col-lg-6">Views: {w.views}</div>
                <div className="col-12 col-lg-12">Publish Date: {w.publishedDate}</div>
              </div>
            </CardHeader>
            <CardBody>
              {w.summary}
            </CardBody>
          </Card>
        </Col>
      ));

    }

    return (
      <div className="tech-writings-page">
        <Row>
          <Col>
            <h1 className="site-category-name">Technical Writings</h1>
            <p>
              I've been helped many times by people through their sharing knowledge, discoveries and experiences, and I thought I should repay such helps I've got from the software developers society. So, I have time to write articles when I discover something during my software developments to contribute to the software developers society.
            </p>
            <p>
              I'm actively writing articles on CodeProject.com. The followings are the articles I've ever published on the website.
            </p>
          </Col>
        </Row>
        <Row>
          {cards}
        </Row>
      </div>
    );
  }
}

interface WritingInfo {
  url: string,
  title: string,
  summary: string,
  rating: number,
  votes: string,
  views: string,
  publishedDate: string,
}

export default connect(
    (state: ApplicationState) => ({ codeProjectApi: state.codeProjectApi }),
    CodeProjectApi.actionCreators
)(TechWritings as any);

import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Rating } from './Rating';

import './TechWritings.scss';

export default class TechWritings extends React.PureComponent<{
}, {
}> {
  private _formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US');
  
  public render() {
    let data: WritingInfo[] = [
      {
        url: "https://www.codeproject.com/Tips/5249190/JsonConverter-Attribute-in-ASP-NET-Core-3-0-Web-AP",
        title: "JsonConverter Attribute in ASP.NET Core 3.0 Web API",
        summary: "ASP.NET Core 3.0 uses a built-in JSON converter from System.Text.Json "
          + "so that JsonConverter attribute from Newtonsoft.Json does not work by default.",
        rating: 5,
        votes: 4,
        views: 1770,
        publishedDate: "23 Oct 2019",
      },
      {
        url: "https://www.codeproject.com/Tips/1271126/Build-Issue-with-Ruby-in-macOS-Bundler-Installatio",
        title: "Build Issue with Ruby in macOS --- Bundler Installation and Bootstrap `docs` Script Run",
        summary: "Tutorial about how to add authentication functionalities "
          + "to your existing ASP.NET Core project using Microsoft.AspNetCore.Identity.UI package.",
        rating: 0,
        votes: 0,
        views: 1260,
        publishedDate: "11 Dec 2018",
      },
      {
        url: "https://www.codeproject.com/Articles/1265638/ASP-NET-Core-Authentication-UI-Installation",
        title: "ASP.NET Core - Authentication UI Installation",
        summary: "Tutorial about how to add authentication functionalities "
          + "to your existing ASP.NET Core project using Microsoft.AspNetCore.Identity.UI package.",
        rating: 5,
        votes: 4,
        views: 9951,
        publishedDate: "10 Nov 2018",
      },
      {
        url: "https://www.codeproject.com/Tips/5249190/JsonConverter-Attribute-in-ASP-NET-Core-3-0-Web-AP",
        title: "Utilities for Enumeration Field Attribute",
        summary: "Enumeration fields typically require a mapping "
          + "to human-friendly names and/or code when we display it on UI or "
          + "output to some persistence. This utility code in this article helps "
          + "to code such mapping inside enumeration declaration by an attributes.",
        rating: 2,
        votes: 4,
        views: 5250,
        publishedDate: "12 Jul 2018",
      },
    ];
    let cards = data.map(w => (
      <Card>
        <CardHeader>
          <h3><a href={w.url}>{w.title}</a></h3>
          <div className="writing-props-row">
            <Rating rate={w.rating} votes={w.votes} className="col-6 col-lg-3 col-xl-2"/>
            <div className="col-6 col-lg-2">Views: {this._formatter.format(w.views)}</div>
            <div className="col-12 col-lg-4">Publish Date: {w.publishedDate}</div>
          </div>
        </CardHeader>
        <CardBody>
          {w.summary}
        </CardBody>
      </Card>
    ));
    return (
      <div className="tech-writings-page">
        <h1 className="site-category-name">Technical Writings</h1>
        <div>
          I sometimes have time to write an article. I've been helped many times by people through their sharing knowledge, discoveries and experiences, and I thought I should repay such bits of help that I've got from the society. In recent years, when I discover something during my software developments, and if it appears not much documented anywhere, I'm trying to leave my discovery somewhere in public. I'm thinking such a contribution is a way how I can repay to the developers society.
        </div>
        <div>
          I'm actively writing articles on CodeProject.com. The followings are the articles I've ever published on the website.
        </div>
        {cards}
      </div>
    );
  }
}

interface WritingInfo {
  url: string,
  title: string,
  summary: string,
  rating: number,
  votes: number,
  views: number,
  publishedDate: string,
}

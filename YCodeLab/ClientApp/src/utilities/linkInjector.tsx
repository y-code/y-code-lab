import React from "react";

function inject(original: (string|JSX.Element)[], links: { [key:string]: string }) : (string|JSX.Element)[] {
  let buf: (string|JSX.Element)[] = original;
  for (let linkKey in links)
    buf = injectLink(buf, linkKey, links[linkKey]);
  buf = buf.map(b => {
    if (typeof(b) === 'string')
      return <>{b}</>
    else
      return b;
  })
  return buf;
}

function injectLink(original: (string|JSX.Element)[], linkKey: string, linkUrl: string) : (string|JSX.Element)[] {
  let result : (string|JSX.Element)[] = [];

  for (let line of original) {
    if (typeof(line) === 'string') {
      let tmp = `#${line}#`;
      let fragments = tmp.split(linkKey);
      if (fragments.length < 2)
        result.push(line);
      else {
        for (let i = 0; i < fragments.length; i++) {
          let fragment = fragments[i];
          if (i === 0)
            fragment = fragment.substr(1, fragment.length - 1);
          else if (i === fragments.length - 1)
            fragment = fragment.substr(0, fragment.length - 1);
          else
            fragment = fragment;
          result.push(fragment);
          if (i < fragments.length - 1)
            result.push(<a href={linkUrl}>{linkKey}</a>);
        }
      }
    } else {
      result.push(line);
    }
  }

  return result;
}

export default {
  inject,
}

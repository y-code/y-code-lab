import { v1 as uuid } from 'uuid';

export function injectLink(original: ((string|JSX.Element)[]|string), links: { [key:string]: string }, routerLinks?: { [key:string]: string }) : (string|JSX.Element)[] {
  let buf: (string|JSX.Element)[] = typeof(original) === "string" ? [ original ] : original;

  for (let linkKey in links) {
    buf = _injectLink(buf, linkKey, links[linkKey],
      (key, url) => <a key={uuid()} href={url} target="_blank">{key}</a>);
  }

  for (let linkKey in routerLinks) {
    buf = _injectLink(buf, linkKey, routerLinks[linkKey],
      (key, url) => <a key={uuid()} href={url}>{key}</a>);
  }

  buf = buf.map(b => {
    if (typeof(b) === 'string')
      return <span key={uuid()}>{b}</span>
    else
      return b;
  })

  return buf;
}

function _injectLink(original: (string|JSX.Element)[], linkKey: string, linkUrl: string, createLink: (key: string, url: string) => JSX.Element) : (string|JSX.Element)[] {
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
            result.push(createLink(linkKey, linkUrl));
        }
      }
    } else {
      result.push(line);
    }
  }

  return result;
}

import React from 'react';

import './Rating.scss';

// const _formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US');

export const Rating: React.FunctionComponent<{
  rate: number,
  votes: string,
  className: string,
}> = function(props){
  const [ rate, setRate ] = React.useState(props.rate);
  const [ votes, setVotes ] = React.useState(props.votes);

  return (
    <div className={`rating-component ${props.className}`}>
      {(() => {
        let stars = [] as any[];
        let i = 0
        for (; i < rate;)
          stars.push(<div key={i++} className="star">⭐</div>);
        while (stars.length < 5)
          stars.push(<div key={i++} className="star">★</div>);
        return stars;
      })()}
      <div className="votes">
        {`(${votes} votes)`}
      </div>
    </div>
  );
}

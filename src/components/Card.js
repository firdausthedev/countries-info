import React, { useState } from 'react';
import styled from 'styled-components';

const Card = ({ id, name, img, countryInfo }) => {
  const [showMore, setShowMore] = useState(false);

  const displayMore = () => {
    setShowMore(!showMore);
  };
  return (
    <CardStyle onClick={displayMore}>
      <p>{name}</p>
      <img src={img} alt='flag' />
      {showMore && (
        <>
          <p>Capital : {countryInfo.capital}</p>
          <p>Region : {countryInfo.region}</p>
          <p>Populations : {countryInfo.population}</p>
          {console.log(countryInfo.languages[0])}
          <p>
            Languages :{' '}
            {countryInfo.languages.map((l) => (
              <span>{l.name} </span>
            ))}
          </p>
        </>
      )}
    </CardStyle>
  );
};

const CardStyle = styled.div`
  background: #277455;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin: 10px;
  color: white;
  transition: 0.35s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: 5px;
  }
  :hover {
    transform: scale(1.1);
  }
  img {
    max-width: 100px;
  }
`;

export default Card;

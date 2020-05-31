import React, { useState } from 'react';
import styled from 'styled-components';

const Card = ({ countryInfo }) => {
  const [showMore, setShowMore] = useState(false);

  const displayMore = () => {
    setShowMore(!showMore);
    document.title = countryInfo.name;
  };

  return (
    <CardStyle>
      <img src={countryInfo.flag} alt={`${countryInfo.name}-flag`} onClick={displayMore} />
      <p id='country-name'>{countryInfo.name}</p>

      {showMore && (
        <>
          <p>Capital : {countryInfo.capital}</p>
          <p>Region : {countryInfo.region}</p>
          <p>Populations : {countryInfo.population.toLocaleString()}</p>
          <p>
            Languages :{' '}
            {countryInfo.languages.map((l, index) => (
              <span key={index}>
                {l.name}
                {index < countryInfo.languages.length - 1 && ', '}
              </span>
            ))}
          </p>
        </>
      )}
    </CardStyle>
  );
};

const CardStyle = styled.div`
  background-color: #e5c0a1;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin: 10px;
  color: black;
  transition: 0.35s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  :hover {
    transform: scale(1.1);
  }
  img {
    max-width: 9rem;
    cursor: pointer;
  }

  #country-name {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export default Card;

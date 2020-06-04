import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const Pagination = ({ length, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(length / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  console.log(currentPage);
  return (
    <PaginationStyle>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <button onClick={() => onPageChange(page)} className={page === currentPage ? 'active' : ''}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  ul {
    display: flex;
    flex-wrap: wrap;

    list-style-type: none;

    li button {
      border: none;
      background: hsl(49, 57%, 86%);
      padding: 1rem 2rem;
      font-family: 'Manrope', sans-serif;
      outline: none;

      :hover {
        background: hsla(49, 57%, 86%, 0.4);
      }
    }
  }

  .active {
    background: hsl(347, 73%, 54%);
    color: white;
    :hover {
      background: hsla(347, 73%, 54%, 0.6);
    }
  }
`;

export default Pagination;

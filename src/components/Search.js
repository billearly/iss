import styled from 'styled-components';

export const Search = styled.input`
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0 0.15em 1.5em #00000036;
  left: 50%;
  min-width: 30rem;
  padding: 0.75rem;
  position: fixed;
  top: 0.75rem;
  transform: translateX(-50%);
  z-index: 5000;

  @media screen and (max-width: 35rem) {
    left: unset;
    margin: 0 0.75rem;
    min-width: unset;
    transform: unset;
    width: calc(100% - 1.5rem);
  }
`;

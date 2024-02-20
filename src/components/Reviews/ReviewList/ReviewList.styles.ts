import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #fdfcff;
`;
export const ContentContainer = styled.div`
  display: flex;
  gap: 36px;
`;

export const Content = styled.div`
  width: 100%;
  height: 650px;
  background-color: #fdfcff;
  display: flex;
  overflow-y: auto;
  margin-right: 24px;
  padding-right: 24px;
  margin-top: 25px;

  ::-webkit-scrollbar {
    width: 12px;
    height: 197px;
  }
  ::-webkit-scrollbar-track {
    background: #efecfd;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: #30009c;
  }
`;

export const FilterContainer = styled.div`
  background: #3f3384;
  box-shadow: 4px 4px 23px 0px #2a124e inset;
  border-radius: 2px;

  width: 48px;
  align-self: stretch;
  height: 655px;
  margin-left: 24px;
  margin-top: 12px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`;

export const FilterTitle = styled.div`
  padding-top: 20px;

  li {
    list-style: none;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 250%;
    text-transform: uppercase;
    cursor: pointer;

    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 19.27%,
      #fff 47.4%,
      rgba(255, 255, 255, 0) 82.29%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const ReviewListContainer = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  height: 80%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 48px;
  grid-column: span 12;
`;

export const TitleReview = styled.h4``;

export const ReviewHeader = styled.span`
  color: var(--primrias-100, #9d8df4);
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.15px;
  padding-left: 24px;
`;

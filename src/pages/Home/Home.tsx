import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { ChartLocationHome } from '../../components/Charts/ChartLocationHome/ChartLocationHome';
import { ChartUserHome } from '../../components/Charts/ChartUserHome/ChartUserHome';
import { ChartReviewHome } from '../../components/Charts/ChartReviewHome/ChartReviewHome';
import * as Style from './Home.styles';
import { CardTotalsHome } from '../../components/CardTotalsHome/CardTotalsHome';

const Home = () => {
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />
          <Style.Content>
            <CardTotalsHome />
            <ChartUserHome />
            <Style.Whapper>
              <ChartLocationHome />
              <ChartReviewHome />
            </Style.Whapper>
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Home;

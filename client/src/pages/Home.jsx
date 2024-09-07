import React, { useEffect } from 'react';
import { useStateContext } from '../context';
import DisplayCampaigns from '../components/DisplayCampaigns';

const Home = () => {
  const { campaigns } = useStateContext();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (campaigns.length) {
      setIsLoading(false);
    }
  }, [campaigns]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <FundCard 
            key={campaign.id}
            owner={campaign.name || 'Unknown'}
            title={campaign.title || 'No title'}
            description={campaign.description || 'No description'}
            target={Number(campaign.target) || 0} // Ensure target is a number
            amountCollected={Number(campaign.amountCollected) || 0} // Ensure amountCollected is a number
            image={campaign.image || '/default-image.jpg'} // Use the image URL from the database
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  );
}

// Define prop types for validation
DisplayCampaigns.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow both string and number
    amountCollected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow both string and number
    image: PropTypes.string // Ensure this is a string (URL)
  })).isRequired,
};

export default DisplayCampaigns;

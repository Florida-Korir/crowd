import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);

  // Function to fetch campaigns from the server
  const getCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:8081/campaigns');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched campaigns:", data); // Log data to inspect the format
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };
  
  
  
  

  useEffect(() => {
    getCampaigns(); // Fetch campaigns when the component mounts
  }, []);

  return (
    <StateContext.Provider value={{ campaigns }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

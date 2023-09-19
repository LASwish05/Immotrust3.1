import React, { useContext, createContext } from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk'; 

const StateContext = createContext();           //provide certain data and functions to other components

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract ('0xB923eC3ad833A349a380Ba9335a1433d75D060f8');

    const address = useAddress();
    const connect = useMetamask();

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');      //operation is asynchronous - waits for the contract method to complete

        const parsedCampaigns = campaigns.map((campaign, i) =>      // transform each campaign into a new object
        ({
            owner: campaign.owner,          //extracts the owner property from the campaign - assigns it to the owner property of the new object
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));
        console.log(parsedCampaigns);
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
    
        const filteredCampaigns = await Promise.all(
            allCampaigns.map(async (campaign) => {
                const donations = await getDonations(campaign.pId);
                const donators = donations.map((donation) => donation.donator);
                return donators.includes(address) ? campaign : null;
            })
        );
    
        const finalFilteredCampaigns = filteredCampaigns.filter(campaign => campaign !== null);
    
        return finalFilteredCampaigns;
    }

    const donate = async (pId, amount) => {
        console.log("Calling donateToCampaign with pId:", pId, "amount:", amount);
    
        const data = await contract.call("donateToCampaign", [pId], {
            value: ethers.utils.parseEther(amount)});
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);    //[] changed
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for ( let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                getCampaigns,
                donate,
                getDonations,
                getUserCampaigns
            }}
        >
           {children} 
        </StateContext.Provider>
    )
}

export const useStateContext =() => useContext(StateContext);
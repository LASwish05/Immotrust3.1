import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { tinyHouseImage } from '../assets';


const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    console.log("Amount:", amount); // Add this line to log the value of amount

    const validAmount = amount ?? "";

    if (!validAmount || isNaN(validAmount)) {
        console.error("Invalid amount value");
        return;
    }

    setIsLoading(true);

    console.log("Calling donate function with pId:", state.pId, "amount:", validAmount);

    await donate(state.pId, validAmount);
    navigate('/');
    setIsLoading(false);
};

  return (
    <div className='flex flex-col items-center'>
      {isLoading && <Loader />}

      <div className='w-full max-w-[700px] flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={`../src/assets/${state.image}`} alt="Campaign" className='w-full h-[410px] object-cover rounded-xl'/>
        </div>

        <div className='mt-10 md:w-[200px] w-full flex flex-wrap justify-center md:flex-col md:items-center gap-[30px]'>
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />

        </div>
      </div>

      <div className='mt-[60px] flex lg: flex-col gap-5 bg-[#3983ED] rounded-[10px]'>
          <div className='flex-[2] flex flex-col gap-[40px]'>
              <div>
                <h4 className='font-epilogue font-semibold text-[18px] uppercase mx-2 mt-2'>Story</h4>
                  <div className='mt-[20px]'>
                      <p className='font-epilogue font-normal text-[16px] leading-[26px] text-justify mx-2'>{state.description}</p>
                  </div>
              </div>

              <div>
                <h4 className='font-epilogue font-semibold text-[18px] uppercase mx-2'>Donators</h4>
                  <div className='mt-[20px] flex flex-col gap-4 mx-2'>
                    {donators.length > 0 ? donators.map((item, index) => (
                      <div key={`${item.donator}-${index}`}
                      className='flex justify-between items-center gap-4'>
                        <p className='font-epilogue font-normal text-[16px] leading-[26px] break-all'>
                          {index + 1}. {item.donator}
                        </p>
                        <p className='font-epilogue font-normal text-[16px] leading-[26px]'>
                          {item.donation}
                        </p>
                      </div>
                    )) : (
                      <p className='font-epilogue font-normal text-[16px] leading-[26px] text-justify'>No donators yet</p>
                    )}
                  </div>
              </div>
          </div>

          <div className='flex-1'>
              <h4 className='font-epilogue font-semibold text-[18px] uppercase mx-2'>Fund</h4>              
          

              <div className='mt-[20px] flex flex-col p-4 bg-[#0025E8] rounded-[10px] min-w-[360px] max-w-[450px] mx-auto'>
                <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#FFFF00]'>
                    Fund the campaign
                </p>
                <div className='mt-[30px]'>
                  <input 
                    type='number'
                    placeholder='ETH 0.1'
                    step='0.001'
                    className='w-full py-[10px] mb-[20px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#FFFF00]
                    bg-transparent font-epilogue text-[#FFFF00] text-[18px] leading-[30px] placeholder:text-[#FFFF00] rounded-[10px]'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <CustomButton 
                    btnType='button'
                    title='Fund Campaign'
                    styles='w-full bg-[#1FF10F]'
                    handleClick={handleDonate}
                  />
                  </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CampaignDetails
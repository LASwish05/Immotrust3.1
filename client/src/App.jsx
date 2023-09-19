import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, Home, Profile } from './pages';

const App = () => {
  return (
    <div className='relative sm:-8 p-4 min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/CampaignDetails/:id' element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ContestDetails from '../components/ContestDetails';
import ContactUs from '../components/ContactUs';
import PreviousWinners from '../components/PreviousWinners';

const Home: React.FC = () => {
    return (
        <>
            <HeroBanner />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, marginBottom: 32 }}>
                <ContestDetails />
            </div>
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, marginBottom: 32 }}>
                <PreviousWinners />
            </div>
            <ContactUs/>
        </>
    );
};

export default Home;
import React from 'react';

import { LandingSection, Introduction, Testimonials } from './components';

export const HomePage : React.FC = () => {
    return (
        <div className=' text-purple-600'>
            <LandingSection />
            <Introduction />
            <Testimonials />
        </div>
    );
}

import React, { ReactNode } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

interface ApplicationLayoutProps {
    children?: ReactNode;
};

export const ApplicationLayout : React.FC<ApplicationLayoutProps> = ({ children } )  => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

import React, { ReactNode } from 'react';

interface BlankPageLayoutProps {
    children?: ReactNode;
};

export const BlankPageLayout : React.FC<BlankPageLayoutProps> = ({ children } )  => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}

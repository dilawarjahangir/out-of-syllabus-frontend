import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className="header text-black h-[150px] w-full flex justify-center items-end">
            <div className="header-section flex h-full w-full justify-center items-center">
                <div className="logo flex items-center h-full">
                    <img src="/logo.svg" alt="Logo" width={100} />
                </div>
                <div className="links-section flex items-center h-full">
                    <div className="nav-item ml-1 mr-5 font-bold">
                        <Link to="/about" aria-label="About">
                            About
                        </Link>
                    </div>
                    <div className="nav-item mx-5 font-bold">
                        <Link to="/resources" aria-label="Resources">
                            Resources
                        </Link>
                    </div>
                    <div className="nav-item mx-5 font-bold">
                        <Link to="/programs" aria-label="Programs">
                            Programs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

import { useState } from 'react';

import SideNavShown from './ShownNav/SideNavShown';
import SideNavHidden from './HiddenNav/SideNavHidden';
import SideNavMobile from './HiddenNav/MobileNav/SideNavMobile';

const SideNav = () => {
    const [isNavVisible, toggleNavVisibility] = useState(false);

    const handleTogglingNavVisibility = (show = true) => (show ? toggleNavVisibility(true) : toggleNavVisibility(false));

    return (
        <>
            {isNavVisible ? (
                <SideNavShown toggleNavVisibility={handleTogglingNavVisibility} />
            ) : (
                <SideNavHidden toggleNavVisibility={handleTogglingNavVisibility} />
            )}
            <SideNavMobile />
        </>
    );
};

export default SideNav;

import { NavLink } from 'react-router-dom';

import NavItemWrapper from '../NavItemWrapper';

const SideNavShownItem = ({ children, slug }) => {
    return (
        <NavItemWrapper>
            <NavLink to={slug} activeClassName="active">
                {children}
            </NavLink>
        </NavItemWrapper>
    );
};

export default SideNavShownItem;

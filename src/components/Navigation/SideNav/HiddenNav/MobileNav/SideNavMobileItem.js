import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import NavItemWrapper from '../../NavItemWrapper';

const SideNavMobileItem = ({ children, slug }) => {
    return (
        <SideNavHiddenItemWrapper>
            <NavLink to={slug} activeClassName="active">
                {children}
            </NavLink>
        </SideNavHiddenItemWrapper>
    );
};

export default SideNavMobileItem;

const SideNavHiddenItemWrapper = styled(NavItemWrapper)`
    min-width: auto;
    a {
        height: 5.5rem;
        padding: 1.5rem;
        margin: 0;
        svg {
            width: 2.8rem;
        }
    }
`;

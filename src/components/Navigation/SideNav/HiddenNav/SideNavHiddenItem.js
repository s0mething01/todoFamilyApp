import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import NavItemWrapper from '../NavItemWrapper';

const SideNavHiddenItem = ({ children, slug }) => {
    return (
        <SideNavHiddenItemWrapper>
            <NavLink to={slug} activeClassName="active">
                {children}
            </NavLink>
        </SideNavHiddenItemWrapper>
    );
};

export default SideNavHiddenItem;

const SideNavHiddenItemWrapper = styled(NavItemWrapper)`
    min-width: auto;
    a {
        height: 5.4rem;
        padding: 1.5rem;
        svg {
            width: 2.8rem;
        }
    }
`;

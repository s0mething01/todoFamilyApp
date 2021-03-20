import styled from 'styled-components';

import navItems from '../../navItems';
import SideNavMobileItem from './SideNavMobileItem';

const SideNavMobile = () => {
    return (
        <SideNavMobileWrapper>
            <ul>
                {navItems.map(({ slug, Icon }) => (
                    <SideNavMobileItem slug={slug} key={slug}>
                        <Icon />
                    </SideNavMobileItem>
                ))}
            </ul>
        </SideNavMobileWrapper>
    );
};

export default SideNavMobile;

const SideNavMobileWrapper = styled.nav`
    display: none;
    @media (max-width: 768px) {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: ${({ theme }) => theme.colors.sideBackgroundGradient};
        z-index: 999999;
        box-shadow: ${({ theme }) => theme.colors.boxShadow};
        ul {
            display: flex;
            justify-content: space-between;
            max-width: 500px;
            padding: 10px;
            margin: auto;
        }
    }
`;

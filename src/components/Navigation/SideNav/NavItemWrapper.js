import styled from 'styled-components';

const SideNavShownItemWrapper = styled.li`
    min-width: 26rem;
    max-width: 26rem;
    a {
        display: flex;
        padding: 0 2rem;
        height: 4.5rem;
        margin: 1rem auto;
        border-radius: ${({ theme }) => theme.borderRadius};
        font-size: ${({ theme }) => theme.font.S};
        font-weight: ${({ theme }) => theme.font.bold};
        display: flex;
        align-items: center;
        &.active {
            background: ${({ theme }) => theme.colors.sideNavActiveGradient};
            color: ${({ theme }) => theme.colors.sideNavTextActive};
            svg {
                fill: ${({ theme }) => theme.colors.sideNavTextActive};
            }
        }
        span {
            display: flex;
            align-items: center;
            padding-left: 2rem;
        }
        svg {
            width: 2.3rem;
            fill: ${({ theme }) => theme.colors.sideNavText};
        }
    }
`;

export default SideNavShownItemWrapper;

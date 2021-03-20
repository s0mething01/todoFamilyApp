import styled from 'styled-components';

import { ReactComponent as GooogleIcon } from 'assets/icons/GoogleButton.svg';

const GoogleRegister = () => {
    return (
        <GoogleRegisterWrapper className="googleConnectWrapper">
            <div className="googleConnect">
                <span>albo połącz z</span>
            </div>
            <button className="googleConnectButton button">
                <GooogleIcon />
                <span>Sign in with Google</span>
            </button>
        </GoogleRegisterWrapper>
    );
};

export default GoogleRegister;

const GoogleRegisterWrapper = styled.div`
    .button {
        font-size: 2.4rem;
        font-weight: ${({ theme }) => theme.font.bold};
        padding: 1.2rem 3rem 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
        width: 45rem;
        max-width: 100%;
        svg {
            fill: ${({ theme }) => theme.colors.white};
            height: 2.6rem;
            width: auto;
            margin: 0 1rem;
        }
        span {
            transform: translateY(0.2rem);
            margin: 0 1rem;
        }
    }
    .googleConnect {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 2rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3rem auto 2rem;
        position: relative;
        width: 45rem;
        max-width: 100%;
        span {
            display: inline-block;
            margin: 0 auto;
            background: ${({ theme }) => theme.colors.white};
            padding: 0 2rem;
            &:after {
                content: '';
                height: 0.1rem;
                width: 100%;
                position: absolute;
                top: 50%;
                left: 0;
                background: ${({ theme }) => theme.colors.secondary};
                z-index: -1;
                transform: translateY(-50%);
            }
        }
    }
    .googleConnectButton {
        background: ${({ theme }) => theme.colors.white};
        color: rgba(0, 0, 0, 0.5);
        svg {
            height: 3.5rem;
        }
        span {
            font-size: 2.5rem;
        }
    }
`;

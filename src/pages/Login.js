import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIconWhite } from 'assets/icons/logoSquareWhite.svg';
import LoginForm from 'components/LoginForm/LoginForm';

const Login = () => (
    <LoginWrapper>
        <main>
            <LogoIconWhite />
            <LoginForm />
        </main>
        <RegisterLink to="/register">
            Nie masz jeszcze konta? <span>Zarejestruj się</span>
        </RegisterLink>
    </LoginWrapper>
);

export default Login;

const RegisterLink = styled(Link)`
    position: fixed;
    bottom: 2rem;
    right: 50%;
    transform: translateX(50%);
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.primary};
    @media (max-width: 768px) {
        display: block;
        position: relative;
        transform: translateX(0);
        right: 0;
        left: 0;
        width: 100%;
        margin: 2rem auto 0;
        text-align: center;
    }
    span {
        font-weight: ${({ theme }) => theme.font.bold};
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

const LoginWrapper = styled.section`
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    z-index: 9999999999;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    @media (max-width: 768px) {
        display: block;
    }
    svg {
        width: 17rem;
        display: block;
        flex-shrink: 0;
        @media (max-width: 768px) {
            width: 9rem;
        }
    }
    main {
        padding: 6rem 18rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        min-height: 40vh;
        min-width: 30vw;
        max-width: calc(100% - 3rem);
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
        & > div {
            width: 100%;
            max-width: 480px;
        }
        @media (max-width: 1600px) {
            padding: 6rem 12rem;
        }
        @media (max-width: 768px) {
            padding: 6rem;
            width: 100%;
            overflow: auto;
            max-width: 95%;
            margin: 0 auto;
            border-radius: 0;
            justify-content: flex-start;
        }
        @media (max-width: 500px) {
            padding: 4rem 3rem;
        }
    }
    h1 {
        color: ${({ theme }) => theme.colors.secondary};
        margin-bottom: 1rem;
        text-align: center;
        @media (max-width: 768px) {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            margin-top: 2rem;
        }
    }
    p {
        color: ${({ theme }) => theme.colors.primary};
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 5rem;
        @media (max-width: 768px) {
            font-size: 2.2rem;
            margin-bottom: 2rem;
        }
    }
`;

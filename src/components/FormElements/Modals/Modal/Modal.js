import { useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as CrossIcon } from 'assets/icons/Cross.svg';
import { ReactComponent as LogoIconWhite } from 'assets/icons/logoSquareWhite.svg';
import { ReactComponent as LogoIconDark } from 'assets/icons/logoSquareDark.svg';

import ThemeColorContext from 'contexts/ThemeContext';

const Modal = ({ children, hideModal, isVisible }) => {
    const { themeColor } = useContext(ThemeColorContext);

    return (
        <ModalWrapper className={!isVisible && 'hidden'}>
            <section>
                <button className="cross" onClick={hideModal}>
                    <CrossIcon />
                </button>
                <div>{themeColor === 'dark' ? <LogoIconDark /> : <LogoIconWhite />}</div>
                {children}
            </section>
        </ModalWrapper>
    );
};

export default Modal;

const ModalWrapper = styled.div`
    background: ${({ theme }) => theme.colors.modalBackgorund};
    position: fixed;
    top: 0;
    min-height: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 3rem;
    overflow: auto;
    @media (max-width: 768px) {
        padding: 0;
    }
    &.hidden {
        display: none;
    }
    section {
        padding: 6rem 18rem;
        background: ${({ theme }) => theme.colors.modalContentBackground};
        color: ${({ theme }) => theme.colors.text};
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
        @media (max-width: 1600px) {
            padding: 6rem 12rem;
        }
        @media (max-width: 768px) {
            padding: 6rem;
            width: 100%;
            height: 100vh;
            overflow: auto;
            max-width: 100%;
            border-radius: 0;
            justify-content: flex-start;
        }
        @media (max-width: 500px) {
            padding: 4rem 3rem;
        }
        div > svg {
            width: 12rem;
            display: block;
            flex-shrink: 0;
            @media (max-width: 768px) {
                width: 9rem;
            }
        }
        button.cross {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 7rem;
            padding: 1rem;
            svg {
                width: 100%;
                height: auto;
                /* fill:  */
            }
        }
        & > h1 {
            margin: 5rem 0 0.5rem;
        }
        & > p {
            color: ${({ theme }) => theme.colors.primary};
            font-size: 2.78rem;
            text-align: center;
            @media (max-width: 768px) {
                font-size: 2.3rem;
            }
        }
        form {
            display: flex;
            flex-direction: column;
            width: 50rem;
            margin-top: 5rem;
            max-width: 100%;
            & > button {
                max-width: 30rem;
                min-width: 30rem;
                margin: 3rem auto 0;
                font-size: 2.2rem;
                padding: 1.7rem 4rem 1.1rem;
            }
            & > div {
                margin-bottom: 3rem;
            }
        }
    }
`;

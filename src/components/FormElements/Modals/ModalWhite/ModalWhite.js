import styled from 'styled-components';

import { ReactComponent as CrossIcon } from 'assets/icons/Cross.svg';
import { ReactComponent as LogoIconWhite } from 'assets/icons/logoSquareWhite.svg';

const ModalWhite = ({ children, hideModal, isVisible }) => {
    return (
        <ModalWrapper className={!isVisible && 'hidden'}>
            <div>
                <section className="whiteModal">
                    <button className="cross" onClick={hideModal}>
                        <CrossIcon />
                    </button>
                    <div>
                        <LogoIconWhite />
                    </div>
                    {children}
                </section>
            </div>
        </ModalWrapper>
    );
};

export default ModalWhite;

const ModalWrapper = styled.div`
    background: ${({ theme }) => theme.colors.modalWhiteBackgorund};
    position: fixed;
    top: 0;
    height: auto;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999;
    display: flex;
    justify-content: center;
    padding: 3rem;
    overflow-x: hidden;
    @media (max-width: 768px) {
        padding: 0;
    }
    &.hidden {
        display: none;
    }
    & > div {
        position: absolute;
        top: 0;
        max-width: calc(100% - 3rem);
        padding: 3rem 0;
        @media (max-width: 768px) {
            padding: 0;
            max-width: 100%;
        }
        section {
            padding: 6rem 18rem;
            background: ${({ theme }) => theme.colors.modalWhiteContentBackground};
            color: ${({ theme }) => theme.colors.text};
            border-radius: ${({ theme }) => theme.borderRadius};
            height: auto;
            min-width: 30vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
            margin: 0;
            position: relative;
            /* overflow: auto; */
            /* justify-content: flex-start; */
            &::-webkit-scrollbar {
                display: none;
            }
            @media (max-width: 1600px) {
                padding: 6rem 12rem;
            }
            @media (max-width: 768px) {
                padding: 6rem;
                width: 100%;
                /* height: 100vh; */
                overflow: auto;
                max-width: 100%;
                border-radius: 0;
                justify-content: flex-start;
            }
            @media (max-width: 500px) {
                padding: 4rem 3rem;
            }
            & > div > svg {
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
                @media (max-width: 768px) {
                    width: 7rem;
                }
                svg {
                    width: 100%;
                    height: auto;
                    /* fill:  */
                }
            }
            & > h1 {
                margin: 5rem 0 0.5rem;
                @media (max-width: 768px) {
                    font-size: 3.5rem;
                    margin-bottom: 1rem;
                }
            }
            & > p {
                color: ${({ theme }) => theme.colors.primary};
                font-size: 2.78rem;
                text-align: center;
                @media (max-width: 768px) {
                    font-size: 2.2rem;
                }
            }
            form {
                display: flex;
                flex-direction: column;
                width: 50rem;
                max-width: 100%;
                & > button {
                    max-width: 30rem;
                    min-width: 30rem;
                    margin: 3rem auto 0;
                    font-size: 2.2rem;
                    padding: 1.7rem 4rem 1.1rem;
                    box-shadow: ${({ theme }) => theme.colors.boxShadowwhite};
                }
                & > div {
                    margin-bottom: 3rem;
                }
            }
        }
    }
`;

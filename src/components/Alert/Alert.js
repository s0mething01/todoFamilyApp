import styled from 'styled-components';

import Button from 'components/Button/Button';

const Alert = ({ children, hideAlert, isVisible }) => {
    return (
        <AlertWrapper className={!isVisible && 'hidden'}>
            <section>
                {children}
                <Button className="cross" onClick={hideAlert}>
                    Ok
                </Button>
            </section>
        </AlertWrapper>
    );
};

export default Alert;

const AlertWrapper = styled.div`
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
    /* align-items: center; */
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
        /* padding: 6rem 18rem; */
        background: ${({ theme }) => theme.colors.modalContentBackground};
        color: ${({ theme }) => theme.colors.text};
        border-radius: ${({ theme }) => theme.borderRadius};
        max-width: calc(100% - 3rem);
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        height: 18rem;
        width: 55rem;
        padding-bottom: 4rem;
        &::-webkit-scrollbar {
            display: none;
        }
        @media (max-width: 1600px) {
            /* padding: 6rem 12rem; */
        }
        @media (max-width: 768px) {
            /* padding: 6rem; */
            width: 100%;
            height: 100vh;
            overflow: auto;
            max-width: 100%;
            border-radius: 0;
            justify-content: center;
        }
        @media (max-width: 500px) {
            /* padding: 4rem 3rem; */
        }
        div > svg {
            width: 12rem;
            display: block;
            flex-shrink: 0;
            @media (max-width: 768px) {
                width: 9rem;
            }
        }
        button {
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            svg {
                width: 100%;
                height: auto;
                /* fill:  */
            }
            @media (max-width: 768px) {
                position: relative;
                margin-top: 2rem;
            }
        }
        & > p {
            color: ${({ theme }) => theme.colors.primary};
            font-size: 2.78rem;
            text-align: center;
            @media (max-width: 768px) {
                font-size: 2.3rem;
                justify-content: center;
            }
        }
        h1 {
            font-size: 2.2rem;
            padding: 2rem;
            @media (max-width: 768px) {
                justify-content: center;
            }
        }
    }
`;

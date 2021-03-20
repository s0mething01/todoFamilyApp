import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowIcon } from 'assets/icons/Arrow.svg';
import { ReactComponent as ArrowIconBack } from 'assets/icons/ArrowBack.svg';

const WizardContext = React.createContext({
    currentPage: 0,
    changePage: () => {},
});

const Wizard = ({ children }) => {
    const [currentPage, setCurrnetPage] = useState(1);

    const maxIndex = children.length;

    const changePage = (newPage) => {
        if (newPage > maxIndex) return;
        if (newPage <= 0) return;
        setCurrnetPage(newPage);
    };

    return (
        <WizardContext.Provider
            value={{
                currentPage,
                changePage,
            }}
        >
            <WizardWrapper maxIndex={maxIndex} currentPage={currentPage}>
                <div className="progressBar">
                    <div className="progressBarProgress" />
                </div>
                {children}
                <div className="controlButtonsWrapper">
                    <button
                        className={currentPage <= 1 ? 'button reverse disabled' : 'button reverse'}
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <ArrowIconBack />
                        <span>Wstecz</span>
                    </button>
                    {currentPage === maxIndex ? (
                        <button className="button">
                            <span>Zatwierdź</span>
                            <ArrowIcon />
                        </button>
                    ) : (
                        <button className="button" onClick={() => changePage(currentPage + 1)}>
                            <span>Dalej</span>
                            <ArrowIcon />
                        </button>
                    )}
                </div>
            </WizardWrapper>
        </WizardContext.Provider>
    );
};

const Page = ({ children, pageIndex, componentLast }) => {
    const { currentPage } = useContext(WizardContext);
    return (
        currentPage === pageIndex && (
            <>
                <article>{children}</article>
                {componentLast}
            </>
        )
    );
};

export { Wizard, Page };

const WizardWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    h1 {
        margin-bottom: 1rem;
        text-align: center;
    }
    p {
        font-size: 2.5rem;
        margin-bottom: 5rem;
    }
    article {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 4rem;
        max-width: 100%;
        order: 1;
        & > label {
            width: 45rem;
            max-width: 100%;
        }
    }
    .progressBar {
        background: rgba(190, 190, 190, 0.4);
        height: 4px;
        margin: 2.5rem auto 1.5rem;
        width: 45rem;
        max-width: 100%;
        position: relative;
        border-radius: ${({ theme }) => theme.borderRadius};
        &Progress {
            position: absolute;
            top: 0;
            bottom: 0;
            width: ${({ currentPage, maxIndex }) => `${(currentPage / maxIndex) * 100}%`};
            background: ${({ theme }) => theme.colors.primary};
            border-radius: ${({ theme }) => theme.borderRadius};
        }
    }
    .button {
        background: ${({ theme }) => theme.colors.gradientDark};
        color: ${({ theme }) => theme.colors.white};
        font-size: 2.4rem;
        font-weight: ${({ theme }) => theme.font.bold};
        padding: 1.2rem 3rem 1.1rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
        width: 45rem;
        max-width: 100%;
        /* width: 100%; */
        box-shadow: ${({ theme }) => theme.colors.boxShadowWhite};
        &.reverse {
            background: ${({ theme }) => theme.colors.gradientLight};
            /* margin-bottom: 2rem; */
        }
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
    .addmember {
        margin-bottom: 3rem;
        background: ${({ theme }) => theme.colors.gradientLight};
    }
    .controlButtonsWrapper {
        display: flex;
        width: 45rem;
        max-width: 100%;
        justify-content: space-between;
        order: 2;
        button {
            width: 48%;
            &.disabled {
                background: ${({ theme }) => theme.colors.greyGradient};
            }
        }
    }
    .googleConnectWrapper {
        order: 3;
    }
`;

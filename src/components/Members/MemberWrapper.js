import styled from 'styled-components';

const CarouselItemWrapper = styled.article`
    & > div {
        width: 100%;
        padding: 2.5rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        background: ${({ theme, color }) => theme.colors.colorsList[color]};
        color: ${({ theme }) => theme.colors.white};
        box-shadow: ${({ theme }) => theme.colors.boxShadow};
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-shrink: 0;
        flex-wrap: wrap;
        @media (max-width: 1100px) {
            max-width: 300px;
        }
        @media (max-width: 768px) {
            margin: 0 auto;
        }
        .infoTop {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            justify-content: center;
            margin-bottom: 1.5rem;
            height: 7.5rem;
            @media (max-width: 768px) {
                height: 8.3rem;
            }
            h5 {
                font-size: ${({ theme }) => theme.font.XL};
                font-weight: ${({ theme }) => theme.font.black};
                letter-spacing: -0.2rem;
                @media (max-width: 768px) {
                    font-size: 4.5rem;
                }
            }
            p {
                font-size: ${({ theme }) => theme.font.S};
                display: flex;
                align-items: center;
                @media (max-width: 768px) {
                    font-size: 2rem;
                }
                span {
                    background: ${({ theme }) => theme.colors.blackAlpha};
                    display: inline-block;
                    width: 2.4rem;
                    height: 2.4rem;
                    padding-top: 0.3rem;
                    border-radius: 0.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 0.5rem;
                    font-weight: ${({ theme }) => theme.font.black};
                    font-size: 1.8rem;
                    @media (max-width: 768px) {
                        font-size: 1.9rem;
                        margin-left: 1rem;
                    }
                }
            }
        }
        img {
            background: ${({ theme }) => theme.colors.whiteAlpha};
            width: 7.2rem;
            height: 7.2rem;
            margin-bottom: 1.5rem;
            border-radius: ${({ theme }) => theme.borderRadius};
            border: none;
            @media (max-width: 768px) {
                height: 8.5rem;
                width: 8.8rem;
            }
        }
        .description {
            font-size: ${({ theme }) => theme.font.S};
            font-weight: ${({ theme }) => theme.font.light};
            line-height: 3rem;
            margin: 1rem 0 2rem;
            flex-grow: 1;
            width: 100%;
            /* @media (max-width: 768px) {
                font-size: 1.75rem;
                line-height: 2.5rem;
            } */
        }
        .boxInfo {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            flex-grow: 0;
            @media (max-width: 768px) {
                margin: 1rem 0;
            }
            div {
                background: ${({ theme }) => theme.colors.blackAlpha};
                width: 48%;
                margin-bottom: 1.5rem;
                border-radius: ${({ theme }) => theme.borderRadius};
                padding: 1.2rem 0;
                flex-shrink: 0;
                p:first-child {
                    font-weight: ${({ theme }) => theme.font.light};
                    font-size: ${({ theme }) => theme.font.S};
                    text-align: center;
                    /* max-width: 9rem; */
                    margin: 0 auto;
                }
                p:last-child {
                    font-weight: ${({ theme }) => theme.font.black};
                    font-size: 2.6rem;
                    padding-top: 0.5rem;
                    text-align: center;
                }
                &.last {
                    margin-bottom: 0;
                }
            }
        }
        & > button {
            background: ${({ theme }) => theme.colors.whiteAlpha};
            margin-left: auto;
            margin-top: 1.5rem;
            color: ${({ theme }) => theme.colors.white};
            font-size: 2rem;
            font-weight: ${({ theme }) => theme.font.bold};
            padding: 1.2rem 3.5rem 1rem;
            border-radius: ${({ theme }) => theme.borderRadius};
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 0;
            svg {
                fill: ${({ theme }) => theme.colors.white};
                height: 2.2rem;
                padding-right: 1rem;
            }
            span {
                transform: translateY(0.2rem);
            }
        }
    }
`;

export default CarouselItemWrapper;

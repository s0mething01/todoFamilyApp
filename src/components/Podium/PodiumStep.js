import styled from 'styled-components';

import { ReactComponent as TrophtGoldIcon } from 'assets/icons/TrophyGold.svg';
import { ReactComponent as TrophtSilverIcon } from 'assets/icons/TrophySilver.svg';
import { ReactComponent as TrophtBrownIcon } from 'assets/icons/TrophyBrown.svg';

const PodiumStep = ({ size, color, name, points, activeTasks }) => {
    return (
        <PodiumStepWrapper color={color} size={size}>
            {size === 1 && <TrophtGoldIcon />}
            {size === 2 && <TrophtSilverIcon />}
            {size === 3 && <TrophtBrownIcon />}
            <h4>{name}</h4>
            <p>{points} punktów</p>
            <p>Liczba wykonywanych teraz zadań: {activeTasks}</p>
        </PodiumStepWrapper>
    );
};

export default PodiumStep;

const PodiumStepWrapper = styled.article`
    width: 100%;
    margin-bottom: 4rem;
    padding: 3rem 2rem 2rem;
    background: ${({ theme, color }) => theme.colors.colorsList[color]};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 768px) {
        max-width: 300px;
        margin: 0 auto;
    }
    svg {
        height: 6rem;
        @media (max-width: 768px) {
            height: 8rem;
        }
    }
    h4 {
        font-size: ${({ theme }) => theme.font.XL};
        font-weight: ${({ theme }) => theme.font.black};
        text-align: center;
        margin: 2rem 0 0.2rem;
    }
    & > p {
        font-size: ${({ theme }) => theme.font.M};
        margin-bottom: 2rem;
        text-align: center;
        font-weight: ${({ theme }) => theme.font.light};
    }
    ul {
        display: flex;
        justify-content: space-between;
        li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: ${({ theme }) => theme.colors.blackAlpha};
            padding: 1rem 0 0.5rem 0;
            width: 45%;
            border-radius: ${({ theme }) => theme.borderRadius};
            text-align: center;
            @media (max-width: 768px) {
                padding: 1.5rem 0 0.75rem 0;
            }
            p:nth-child(1) {
                font-size: 1.6rem;
                @media (max-width: 768px) {
                    font-size: 1.8rem;
                }
            }
            p:nth-child(2) {
                font-weight: ${({ theme }) => theme.font.black};
                font-size: 2rem;
                padding: 0.5rem 0 0 0;
                @media (max-width: 768px) {
                    font-size: 2.5rem;
                }
            }
        }
    }
`;

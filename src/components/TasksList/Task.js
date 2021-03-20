import styled from 'styled-components';

import { useAccount } from 'contexts/AccountContext';
import { connect } from 'react-redux';
import getDate from 'utils/getDate';

import Timer from './Timer';
import TaskButton from './TaskButton';

const Task = ({ task, members }) => {
    const { points, expirationDate, title, content, ownerID } = task;
    const { currentAccount } = useAccount();

    const date = getDate(expirationDate);
    const { name, color } = members.filter((member) => member.id === ownerID)[0] || { name: null, color: 0 };

    return (
        <TaskWrapper bg={color} date={date}>
            <h3>{title}</h3>
            <p className="points">
                <span>{points} </span>
                Punktów
            </p>
            <div className="content">
                <p>{content}</p>
            </div>
            <Timer expirationDate={date} />
            <TaskButton accountType={currentAccount.role} owner={name} task={task} />
        </TaskWrapper>
    );
};

const mapStateToProps = (state) => ({
    members: state.members,
});

export default connect(mapStateToProps)(Task);

const TaskWrapper = styled.article`
    background: ${({ theme, bg }) => theme.colors.colorsList[bg]};
    display: ${({ date }) => (date - new Date() < 0 ? 'none' : 'grid')};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius};
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 4rem;
    padding: 3rem;

    grid-gap: 2.2rem;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        'title points'
        'content button'
        'date button';
    @media (max-width: 1100px) {
        max-width: 52rem;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas:
            'title title'
            'content content'
            'points date'
            'button button';
    }
    @media (max-width: 768px) {
        max-width: 400px;
        margin: 0 auto 4rem;
        padding: 2.5rem;
    }
    h3 {
        grid-area: title;
        font-size: ${({ theme }) => theme.font.L};
        font-weight: ${({ theme }) => theme.font.black};
        @media (max-width: 1100px) {
            /* font-size: 4rem; */
            width: 100%;
        }
    }
    .timerWrapper {
        grid-area: date;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        font-size: 2.8rem;
        font-weight: ${({ theme }) => theme.font.black};
        span {
            font-size: 2.8rem;
            font-weight: ${({ theme }) => theme.font.black};
            padding-left: 1.5rem;
        }
        @media (max-width: 1100px) {
            font-size: 2.1rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            border-radius: ${({ theme }) => theme.borderRadius};
            padding: 1rem 0.7rem;
            span {
                margin: 0.5rem 0 0.2rem;
                font-size: 2.6rem;
                padding: 0;
                order: -1;
            }
        }
    }

    .points {
        grid-area: points;
        font-size: 3.2rem;
        font-weight: ${({ theme }) => theme.font.black};
        letter-spacing: -0.2rem;
        text-align: right;
        @media (max-width: 1100px) {
            background: rgba(0, 0, 0, 0.2);
            border-radius: ${({ theme }) => theme.borderRadius};
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 2.2rem;
            span {
                display: block;
                margin: 0.5rem 0 0.2rem;
                font-size: 2.8rem;
                padding: 0;
            }
        }
    }

    .content {
        width: 100%;
        grid-area: content;
        p {
            max-width: 75rem;
            font-size: ${({ theme }) => theme.font.S};
            font-weight: ${({ theme }) => theme.font.light};
            line-height: 3rem;
        }
    }

    .buttonWrapper {
        grid-area: button;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        @media (max-width: 1100px) {
            align-items: flex-end;
            &.withAddnotation {
                align-items: center;
                width: 170px;
                margin-left: auto;
            }
        }
        &.doubleButton {
            margin-top: auto;
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
        }
        button.taskButton {
            font-size: 2.5rem;
            padding: 1.1rem 3.5rem 0.65rem;
            font-weight: ${({ theme }) => theme.font.bold};
            color: ${({ theme }) => theme.colors.white};
            background: ${({ theme }) => theme.colors.whiteAlpha};
            border-radius: ${({ theme }) => theme.borderRadius};
            &.left {
                margin-right: 2rem;
            }
            &.disabled {
                background-color: rgba(0, 0, 0, 0.3);
                color: rgba(255, 255, 255, 0.5);
            }
        }
        p {
            font-size: 1.6rem;
            color: rgba(255, 255, 255, 0.5);
            span {
                font-size: 1.6rem;
                font-weight: ${({ theme }) => theme.font.bold};
            }
            &.top {
                text-align: center;
                margin-bottom: 0.7rem;
            }
            &.bottom {
                text-align: center;
                margin-top: 1.1rem;
            }
        }
    }
`;

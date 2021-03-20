import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ label, name, customClass = '', placeholder, date, setDate, min = new Date(), step = 30 * 60 }) => {
    const isWeekday = (time) => {
        return time - new Date() > 0;
    };
    return (
        <DateInputWrapper className={customClass} htmlFor={name}>
            <span className="label">{label}</span>
            <DatePicker
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                id={name}
                name={name}
                popperClassName="propper"
                step={step}
                min={min}
                filterDate={isWeekday}
                timeFormat="HH:mm"
                selected={date}
                onChange={(d) => setDate(d)}
                popperPlacement="top-center"
                shouldCloseOnSelect
                placeholder={placeholder}
            />
        </DateInputWrapper>
    );
};

export default DateInput;

const DateInputWrapper = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    span {
        color: ${({ theme }) => theme.colors.title};
        width: 100%;
        font-weight: 700;
        font-size: 2.5rem;
        letter-spacing: -0.1rem;
    }
    input {
        width: 100%;
    }
    input::placeholder {
        color: ${({ theme }) => theme.colors.title};
        opacity: 0.7;
    }
    .propper {
        .react-datepicker {
            font-size: 1.5rem;
            border-radius: ${({ theme }) => theme.borderRadius};
            font-family: 'Overpass', sans-serif;
            display: flex;
            .react-datepicker__month-container {
            }
            .react-datepicker__current-month {
                font-size: 1.4rem;
            }
            .react-datepicker__header {
                height: 5.4rem;
            }
            .react-datepicker__header .react-datepicker__header--has-time-select {
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 2.2rem;
            }
            .react-datepicker__day-name,
            .react-datepicker__day,
            .react-datepicker__time-name {
                width: 2.2rem;
                height: 2.2rem;
            }
            .react-datepicker__header--time {
                height: 5.4rem;
            }
            .react-datepicker__month {
                padding: 1rem;
            }
            .react-datepicker__header .react-datepicker__header--time {
                padding: 1rem;
            }
            .react-datepicker-time__header {
                padding: 1rem;
                font-size: 1.4rem;
                height: 2.2rem;
            }
            .react-datepicker__week {
                display: flex;
            }
            .react-datepicker__week div {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0rem;
                padding-top: 0.15rem;
            }
            .react-datepicker__time-container {
                display: flex;
                flex-direction: column;
                .react-datepicker__time {
                    flex-grow: 1;
                    display: flex;
                    .react-datepicker__time-box {
                        flex-grow: 1;
                        display: flex;
                        .react-datepicker__time-list {
                            flex-grow: 1;
                            height: 100% !important;
                            max-height: 18rem;
                            .react-datepicker__time-list-item {
                                height: 3rem;
                            }
                        }
                    }
                }
            }
        }
    }
`;

/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import { useSelect } from 'downshift';

const Select = ({
    label = 'label',
    items = ['option1', 'option2'],
    selectedItem,
    handleSelectedItemChange,
    placeholder = 'Elements',
    isWhite,
}) => {
    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = useSelect({
        items,
        selectedItem,
        onSelectedItemChange: handleSelectedItemChange,
    });

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <SelectWrapper className="select" isWhite={isWhite}>
            <label {...getLabelProps()}>{label}</label>
            <button type="button" {...getToggleButtonProps()}>
                {selectedItem || placeholder}
            </button>
            <ul {...getMenuProps()}>
                {isOpen &&
                    items.map((item, index) => (
                        <li
                            className={highlightedIndex === index ? 'active' : ''}
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </SelectWrapper>
    );
};

export default Select;

const SelectWrapper = styled.div`
    position: relative;
    label {
        color: ${({ theme }) => theme.colors.title};
        width: 100%;
        font-weight: ${({ theme }) => theme.font.bold};
        font-size: 2.3rem;
        letter-spacing: -0.1rem;
    }
    button {
        color: ${({ theme }) => theme.colors.text};
        width: 100%;
        text-align: left;
        font-weight: ${({ theme }) => theme.font.normal};
        font-size: 1.9rem;
        padding: 0.2rem 0 0.6rem;
        border-bottom: 0.1rem solid ${({ theme }) => theme.colors.text};
        margin-top: 1rem;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1rem;
            width: 0;
            height: 0;
            border-left: 0.6rem solid transparent;
            border-right: 0.6rem solid transparent;
            border-top: 0.8rem solid ${({ theme }) => theme.colors.text};
        }
    }

    ul {
        position: absolute;
        left: 0;
        right: 0;
        border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
        border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
        background: ${({ theme }) => theme.colors.selectBackground};
        &:active {
            border: none;
            outline: none;
        }
        &:focus {
            border: none;
            outline: none;
        }
        li {
            color: ${({ theme }) => theme.colors.text};
            padding: 0.8rem;
            background: ${({ theme }) => theme.colors.selectBackground};
            border: none;
            outline: none;
            cursor: pointer;
            &.active {
                background: ${({ theme }) => theme.colors.sideNavActive};
                color: ${({ theme }) => theme.colors.white};
            }
            &:last-child {
                border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
                border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
            }
        }
    }

    // isWhite

    label {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.secondary : null)};
    }
    button {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
        border-bottom: 0.1rem solid ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
        &::after {
            border-top: 0.8rem solid ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
        }
    }
    ul {
        li {
            color: ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
            background: ${({ theme, isWhite }) => (isWhite ? theme.colors.whiteBlue : null)};
            &.active {
                background: ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
            }
        }
    }
`;

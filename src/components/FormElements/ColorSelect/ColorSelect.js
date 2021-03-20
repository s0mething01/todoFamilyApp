/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import { useSelect } from 'downshift';
import { colors } from 'theme';

const ColorSelect = ({ label = 'Colors', items, selectedItem, handleSelectedItemChange, isWhite }) => {
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
                <div
                    className="colorPreview"
                    style={{
                        background: colors.colorsList[selectedItem],
                    }}
                />
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
                            <div
                                className="colorPreview"
                                style={{
                                    background: colors.colorsList[item],
                                }}
                            />
                        </li>
                    ))}
            </ul>
        </SelectWrapper>
    );
};

export default ColorSelect;

const SelectWrapper = styled.div`
    position: relative;
    label {
        color: ${({ theme }) => theme.colors.title};
        width: 100%;
        font-weight: ${({ theme }) => theme.font.bold};
        font-size: 2.5rem;
        letter-spacing: -0.1rem;
    }
    button {
        color: ${({ theme }) => theme.colors.text};
        width: 100%;
        text-align: left;
        font-weight: ${({ theme }) => theme.font.light};
        font-size: 1.7rem;
        padding: 0.2rem 0 0.6rem;
        border-bottom: 0.1rem solid ${({ theme }) => theme.colors.text};
        margin-top: 1rem;
        position: relative;
        cursor: pointer;
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
        .colorPreview {
            width: 25%;
            height: 2.2rem;
            border-radius: ${({ theme }) => theme.borderRadius};
        }
    }

    ul {
        position: absolute;
        left: 0;
        right: 0;
        border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
        border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
        background: ${({ theme }) => theme.colors.sideNav};
        z-index: 99999;
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
            padding: 0.6rem;
            background: ${({ theme }) => theme.colors.whiteAlpha};
            border: none;
            outline: none;
            cursor: pointer;
            &.active {
                background: ${({ theme }) => theme.colors.blackAlpha};
                color: ${({ theme }) => theme.colors.white};
            }
            &:last-child {
                border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
                border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
            }
            .colorPreview {
                width: 100%;
                height: 2.3rem;
                border-radius: ${({ theme }) => theme.borderRadius};
            }
        }
    }

    //isWhite
    ul {
        background: ${({ theme }) => theme.colors.whiteBlue};
    }

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
`;

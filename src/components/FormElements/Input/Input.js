import styled from 'styled-components';

const Input = ({ placeholder = '', label, name, type = 'text', customClass = '', isWhite, value = '', onChange }) => {
    return (
        <InputWrapper className={customClass} htmlFor={name} type={type} isWhite={isWhite}>
            <span className={type === 'file' ? 'isWhite label' : 'label'}>{label}</span>
            <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        </InputWrapper>
    );
};

export default Input;

const InputWrapper = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    span {
        color: ${({ theme }) => theme.colors.title};
        width: 100%;
        font-weight: 700;
        font-size: 2.3rem;
        letter-spacing: -0.1rem;

        background: ${({ theme, type }) => (type === 'file' ? theme.colors.gradientDark : null)};
        color: ${({ theme, type }) => (type === 'file' ? theme.colors.white : null)};
        font-weight: ${({ theme, type }) => (type === 'file' ? theme.font.bold : null)};
        border-radius: ${({ theme, type }) => (type === 'file' ? theme.borderRadius : null)};
        display: ${({ type }) => (type === 'file' ? 'flex' : null)};
        justify-content: ${({ type }) => (type === 'file' ? 'center' : null)};
        align-items: ${({ type }) => (type === 'file' ? 'center' : null)};
        max-width: ${({ type }) => (type === 'file' ? '30rem' : null)};
        min-width: ${({ type }) => (type === 'file' ? '30rem' : null)};
        margin: ${({ type }) => (type === 'file' ? '3rem auto -3rem' : null)};
        font-size: ${({ type }) => (type === 'file' ? '2.3rem' : null)};
        padding: ${({ type }) => (type === 'file' ? '1.7rem 4rem 1.1rem' : null)};
        cursor: ${({ type }) => (type === 'file' ? 'pointer' : null)};

        //isWhite
    }
    input::placeholder {
        color: ${({ theme }) => theme.colors.title};
        opacity: 0.7;
    }
    input[type='file'],
    input[tyoe='image'] {
        display: none;
    }
    span {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.secondary : null)};
    }
    span.isWhite {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.white : null)};
    }
    input {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
        border-bottom: 0.1rem solid ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
        &::placeholder {
            color: ${({ theme, isWhite }) => (isWhite ? theme.colors.secondary : null)};
        }
    }
`;

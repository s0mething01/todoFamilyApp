import styled from 'styled-components';

const ImageInput = ({ placeholder = '', label, name, customClass = '', isWhite, onChange }) => {
    const setImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
        }
    };
    return (
        <InputWrapper className={customClass} htmlFor={name} isWhite={isWhite}>
            <span className="isWhite label">{label}</span>
            <input type="file" id={name} name={name} placeholder={placeholder} onChange={setImage} />
        </InputWrapper>
    );
};

export default ImageInput;

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

        background: ${({ theme }) => theme.colors.gradientDark};
        color: ${({ theme }) => theme.colors.white};
        font-weight: ${({ theme }) => theme.font.bold};
        border-radius: ${({ theme }) => theme.borderRadius};
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 30rem;
        min-width: 30rem;
        margin: 3rem auto -3rem;
        font-size: 2.3rem;
        padding: 1.7rem 4rem 1.1rem;
        cursor: pointer;

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

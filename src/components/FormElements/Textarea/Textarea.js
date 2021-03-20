import styled from 'styled-components';

const Textarea = ({ placeholder = '', label, name, type = 'text', customClass = '', isWhite, value = '', onChange }) => {
    return (
        <TextareaWrapper className={customClass} htmlFor={name} type={type} isWhite={isWhite}>
            <span className="label">{label}</span>
            <textarea value={value} onChange={(e) => onChange(e.target.value)} type={type} id={name} name={name} placeholder={placeholder} />
        </TextareaWrapper>
    );
};

export default Textarea;

const TextareaWrapper = styled.label`
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
    textarea {
        resize: none;
        height: 10rem;
    }
    textarea::placeholder {
        color: ${({ theme }) => theme.colors.title};
        opacity: 0.7;
    }
    //isWhite
    span {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.secondary : null)};
    }
    textarea::placeholder {
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.secondary : null)};
        opacity: 0.7;
    }
    textarea {
        border-bottom: 0.1rem solid ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
        color: ${({ theme, isWhite }) => (isWhite ? theme.colors.primary : null)};
    }
`;

import styled from 'styled-components';

const Button = ({ children, onClick, type = 'button', className }) => {
    return (
        <ButtonWrapper onClick={onClick} type={type} className={className}>
            {children}
        </ButtonWrapper>
    );
};

export default Button;

const ButtonWrapper = styled.button`
    background: ${({ theme }) => theme.colors.gradientLight};
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.1rem;
    font-weight: ${({ theme }) => theme.font.bold};
    padding: 1.4rem 3.2rem 1.1rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    svg {
        fill: ${({ theme }) => theme.colors.white};
        height: 2.2rem;
    }
    span {
        transform: translateY(0.2rem);
        padding-right: 1.5rem;
    }
`;

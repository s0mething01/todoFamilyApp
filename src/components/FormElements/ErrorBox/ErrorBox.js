import styled from 'styled-components';

const ErrorBox = ({ errors }) => {
    return <ErrorBoxWrapper>{errors.length ? errors.map(({ message }) => <li key={message}>{message}</li>) : null}</ErrorBoxWrapper>;
};

export default ErrorBox;

const ErrorBoxWrapper = styled.ul`
    padding: 1rem 0 2rem;
    li {
        font-size: ${({ theme }) => theme.font.S};
        color: ${({ theme }) => theme.colors.errorRed};
        padding: 0.3rem 0;
    }
`;

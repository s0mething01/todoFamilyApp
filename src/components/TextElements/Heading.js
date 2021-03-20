import styled from 'styled-components';

const Heading = styled.h1`
    color: ${({ theme }) => theme.colors.title};
    font-size: ${({ theme }) => theme.font.XXL};
    font-weight: ${({ theme }) => theme.font.black};
    letter-spacing: -0.2rem;
    margin: 1rem 0 3rem;
    @media (max-width: 768px) {
        text-align: center;
        font-size: 4.5rem;
        margin-top: 4rem;
    }
`;

export default Heading;

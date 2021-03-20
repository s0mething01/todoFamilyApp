import styled from 'styled-components';

const SubHeading = styled.h1`
    color: ${({ theme }) => theme.colors.title};
    font-size: ${({ theme }) => theme.font.XL};
    font-weight: ${({ theme }) => theme.font.black};
    letter-spacing: -0.2rem;
    margin: 1rem 0 3rem;
    @media (max-width: 768px) {
        text-align: center;
    }
`;

export default SubHeading;

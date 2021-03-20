import styled from 'styled-components';

const Podium = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.gridGap};
    grid-template-rows: auto;
    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        margin-bottom: 10rem;
    }
`;

export default Podium;

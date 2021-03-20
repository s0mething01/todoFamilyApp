import styled from 'styled-components';

const ContentWrapper = styled.section`
    width: 110rem;
    padding: 20rem 0 6rem;
    margin: 0 auto;
    max-width: 75%;
    @media (max-width: 1400px) {
        width: 110rem;
    }
    @media (max-width: 1100px) {
        width: 78rem;
    }
    @media (max-width: 768px) {
        padding: 14rem 0 14rem;
        width: 82rem;
        max-width: calc(100% - 9rem);
    }
    @media (max-width: 450px) {
        max-width: calc(100% - 4rem);
    }
`;

export default ContentWrapper;

import styled from 'styled-components';

import { colors } from 'theme';

const RegisterUserTile = ({ color, children }) => {
    return (
        <RegisterUserTileWrapper className="userTile" style={{ background: colors.colorsList[color] }}>
            {children}
        </RegisterUserTileWrapper>
    );
};

export default RegisterUserTile;

const RegisterUserTileWrapper = styled.div`
    max-width: 100%;
    width: 45rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.7rem;
    font-weight: ${({ theme }) => theme.font.bold};
    padding: 1.2rem 3rem 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 auto;
    max-width: 100%;
    box-shadow: ${({ theme }) => theme.colors.boxShadowWhite};
    margin-bottom: 2rem;
`;

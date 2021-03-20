import styled from 'styled-components';

import avatar from 'assets/images/child.png';

const LoginUserTiles = ({ items, activeIndex, setActiveUser }) => {
    return (
        <LoginUserTilesWrapper>
            {items.map(({ image, name, id }) => (
                <LoginUserTile
                    src={image || avatar}
                    isActive={id === activeIndex}
                    onClick={() => setActiveUser(id)}
                    key={id}
                >
                    <div className="image" />
                    <p className="name">{name}</p>
                </LoginUserTile>
            ))}
        </LoginUserTilesWrapper>
    );
};

export default LoginUserTiles;

const LoginUserTilesWrapper = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 55rem;
    margin: 0 auto 3rem;
`;

const LoginUserTile = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ theme, isActive }) => isActive && theme.colors.whiteBlue};
    padding: 1.8rem 1.5rem 0.6rem 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    div {
        background-image: url(${({ src }) => src});
        background-repeat: no-repeat;
        background-size: cover;
        height: 10rem;
        width: 10rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        margin: 0.1rem;
        @media (max-width: 500px) {
            width: 12rem;
            height: 12rem;
        }
        @media (max-width: 360px) {
            width: 14rem;
            height: 14rem;
        }
    }
    p.name {
        margin: 1rem 0 0 0;
        margin-bottom: 0;
        font-size: 2rem;
    }
`;

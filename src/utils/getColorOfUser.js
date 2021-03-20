const getColorOfUser = (user, childs) =>
    user === '' ? 0 : childs.filter((child) => child.name === user)[0].color;

export default getColorOfUser;

import withAuth from 'hocs/withAuth';

const noFound = () => {
    return <p>404 Page not found</p>;
};

export default withAuth(noFound);

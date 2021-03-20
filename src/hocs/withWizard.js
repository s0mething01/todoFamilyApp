import { useState } from 'react';

const withWizard = ({ pages }) => (WrappedComponent) => (props) => {
    const [page, setPage] = useState(1);

    const nextPage = () => setPage(page >= pages ? page : page + 1);
    const prevPage = () => setPage(page <= 1 ? page : page - 1);

    return <WrappedComponent page={page} nextPage={nextPage} prevPage={prevPage} {...props} />;
};

export default withWizard;

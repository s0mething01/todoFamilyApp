import { Heading } from 'components/TextElements';
import withAuth from 'hocs/withAuth';

const History = () => {
    return <Heading>Historia</Heading>;
};

export default withAuth(History);

import { BrowserRouter as Router } from 'react-router-dom';

const withRouter = (WrappedComponent) => (props) => (
    <Router>
        <WrappedComponent {...props} />
    </Router>
);

export default withRouter;

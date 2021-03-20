import { useAccount } from 'contexts/AccountContext';
import { types as AccountTypes } from 'components/Account/AccountTypes';

const withParentAccount = ({ children }) => {
    const { currentAccount } = useAccount();

    return <>{currentAccount.role === AccountTypes.PARENT ? <>{children}</> : null}</>;
};

export default withParentAccount;

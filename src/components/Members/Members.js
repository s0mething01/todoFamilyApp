import styled from 'styled-components';
import { types as AccountTypes } from 'components/Account/AccountTypes';
import ParentMember from './ParentMember';
import ChildMember from './ChildMember';

const Members = ({ members }) => (
    <MembersWrapper>
        {members.map((member) =>
            member.role === AccountTypes.CHILD ? <ChildMember key={member.id} member={member} /> : <ParentMember key={member.id} member={member} />
        )}
    </MembersWrapper>
);

export default Members;

const MembersWrapper = styled.section`
    margin: 3rem 0 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.gridGap};
    overflow: hidden;
    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

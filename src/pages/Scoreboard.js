import { connect } from 'react-redux';
import withAuth from 'hocs/withAuth';

import { Podium, PodiumStep } from 'components/Podium';
import { Heading } from 'components/TextElements';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import { types as AccountTypes } from 'components/Account/AccountTypes';

const Scoreboard = ({ childs, tasks }) => (
    <ContentWrapper>
        <Heading>Tablica wyników!</Heading>
        <Podium>
            {childs.map(({ id, color, name, points }, index) => {
                if (index > 2) return null;
                return (
                    <PodiumStep
                        key={id}
                        size={index + 1}
                        color={color}
                        name={name}
                        points={points}
                        activeTasks={tasks.filter((task) => task.ownerID === id).length}
                    />
                );
            })}
        </Podium>
    </ContentWrapper>
);

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    childs: state.members.filter((member) => member.role === AccountTypes.CHILD).sort((member, prevMember) => prevMember.points - member.points),
});

export default connect(mapStateToProps)(withAuth(Scoreboard));

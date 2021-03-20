import getDate from 'utils/getDate';
import Task from './Task';

const TasksList = ({ tasks }) => (
    <ul>
        {tasks
            .sort(({ expirationDate: date }, { expirationDate: prevDate }) => getDate(date) - getDate(prevDate))
            .map((task) => (
                <Task task={task} key={task.id} />
            ))}
    </ul>
);

export default TasksList;

import { ReactComponent as TasksIcon } from 'assets/icons/Tasks.svg';
import { ReactComponent as MembersIcon } from 'assets/icons/Members.svg';
import { ReactComponent as ScoreboardIcon } from 'assets/icons/Scoreboard.svg';
import { ReactComponent as AwardsIcon } from 'assets/icons/Awards.svg';
// import { ReactComponent as HistoryIcon } from 'assets/icons/History.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/Settings.svg';

const navElements = [
    {
        slug: '/tasks',
        Icon: TasksIcon,
        content: 'Zadania',
    },
    {
        slug: '/members',
        Icon: MembersIcon,
        content: 'Domownicy',
    },
    {
        slug: '/scoreboard',
        Icon: ScoreboardIcon,
        content: 'Tablica wyników',
    },
    {
        slug: '/awards',
        Icon: AwardsIcon,
        content: 'Nagrody',
    },
    {
        slug: '/account',
        Icon: SettingsIcon,
        content: 'Ustawienia',
    },
];

export default navElements;

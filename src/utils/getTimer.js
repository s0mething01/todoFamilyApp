const getTimer = (date) => {
    const time = new Date(date).getTime() - new Date().getTime();

    let days = Math.floor(time / (1000 * 60 * 60 * 24)).toString();
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString();
    let seconds = Math.floor((time % (1000 * 60)) / 1000).toString();

    days = `${days !== '0' ? `${days} Dni ` : ''}`;
    hours = `${hours !== '0' ? `${hours < 10 ? `0${hours}` : hours}:` : ''}`;
    minutes = `${minutes !== '0' ? `${minutes < 10 ? `0${minutes}` : minutes}:` : '00'}`;
    seconds = `${seconds !== '0' ? `${seconds < 10 ? `0${seconds}` : seconds}` : '00'}`;

    if (Math.floor(time / (1000 * 60 * 60 * 24)) < 1) return `${hours}${minutes}${seconds}`;
    return `${days}`;
};

export default getTimer;

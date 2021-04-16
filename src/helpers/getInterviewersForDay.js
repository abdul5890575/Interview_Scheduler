export function getInterviewersForDay(state, dayname) {
    const result = [];
    const dayObj = state.days.find((d) => d.name === dayname);
    if (!dayObj) {
        return [];
    }

    for (let id of dayObj.interviewers) {
        if (state.interviewers[id]) {
        result.push(state.interviewers[id]);
        }
    }
    return result;
}


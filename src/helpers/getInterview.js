
export function getInterview (state, interview) {

    if ( interview === null){
        return null
    } else{
        let interviewid = interview.interviewer;
        let interviewersObj =state.interviewers;
        let appobj={}

        for (let interviewersobjskey in interviewersObj) {
            if( interviewid == interviewersobjskey) {
                appobj = interviewersObj[interviewid]
            }
        }
        let inter = {...interview, interviewer : appobj }
        return inter;
    }
}


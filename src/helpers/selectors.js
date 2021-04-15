export function getAppointmentsForDay (state, day) {

   const daysArray = state.days;
   let AppArray1 = []
   let resultArray = []

  for(let dayobject of daysArray) {
      if (day === dayobject.name) {
        let AppArray = dayobject.appointments.map(x=>x)
        AppArray1 = AppArray
      }
  }
  if ( AppArray1.length === 0 ){
      return []
  } else {
    for (let indexvalue of AppArray1) {
        resultArray.push(state['appointments'][`${indexvalue}`])
    }
    return resultArray
  }
}





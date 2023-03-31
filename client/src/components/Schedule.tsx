import { useEffect, useState } from "react"
import { Schedule } from "@prisma/client"
import { useApi } from "../hooks/useApi"

export const ScheduleView = () => {
    const [events, setEvents] = useState<Schedule[]>([])
    const api = useApi();
    const days: Record<number, "sunday"|"monday"|"tuesday"|"wednesday"|"thursday"|"friday"|"saturday"> = {
        0:"sunday",
        1:"monday",
        2:"tuesday",
        3:"wednesday",
        4:"thursday",
        5:"friday",
        6:"saturday"
    }

    useEffect(()=>{
        api.get('/schedules/mine')
            .then(response => {setEvents(response.schedules);console.log(response)});
    },[])
    return(
        <div className="Schedule">
            <h2 className="box">Today's Schedule</h2>
            <ol>
            {events.map( event => {
                if (event[days[new Date().getDay()]])
                return <li key={event.id}>{event.type}:{event.description}</li>
            })}
            </ol>
        </div>
    )
}
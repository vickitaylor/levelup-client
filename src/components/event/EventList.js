import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../managers/EventManger";

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
            <header>
                <button className="btn btn-2 btn sep icon-create" onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}>Register New Event</button>
            </header>
            <article className="events">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="event__game">{event.game.title}</div>
                            <div className="event__date">{new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC' })} at {event.time}</div>
                            <div className="event_desc">{event.description}</div>
                            <div className="event_organizer">Event Organizer: {event.organizer.user.first_name} {event.organizer.user.last_name}</div> <br />
                        </section>
                    })
                }
            </article>
        </>
    )
}

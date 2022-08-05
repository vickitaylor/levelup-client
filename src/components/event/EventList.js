import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, getEvents, leaveEvent, joinEvent } from "../../managers/EventManger";

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    // to rerender the list
    const renderEvents = () => [
        getEvents().then(setEvents)
    ]

    const deleteButton = (id) => {
        deleteEvent(id)
            .then(() => {
                renderEvents()
            })
    }

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
                            <br />
                            <div className="event__game">{event.game.title} <Link to={`/events/${event.id}/edit`}>⚙️</Link><button onClick={() => { deleteButton(event.id) }}>❌</button></div>
                            <div className="event__date">{new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC' })} at {event.time}</div>
                            <div className="event_desc">{event.description}</div>
                            <div className="event_organizer">Event Organizer: {event.organizer.user.first_name} {event.organizer.user.last_name}</div>
                            {
                                // button to display to either join the event or leave the event, based on if joined is true or false, if joined is true, the false button will appear, and if false the join button will appear, list will rerender once complete.
                                event.joined
                                    ? <button className="btn btn-3" onClick={(() => { leaveEvent(event.id).then(() => renderEvents()) })}>Leave</button>

                                    : <button className="btn btn-2" onClick={(() => { joinEvent(event.id).then(() => renderEvents()) })}>Join</button>
                            }

                        </section>
                    })
                }
            </article>
        </>
    )
}

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getSingleEvent, updateEvent } from "../../managers/EventManger"
import { getGames } from "../../managers/GameManager"



export const EditEvent = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const [games, setGames] = useState([])


    const [event, updatedEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(() => {
        getSingleEvent(eventId).then(data => updatedEvent(data))
    },
        [eventId]
    )

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (evt) => {
        const copy = { ...event }
        copy[evt.target.name] = evt.target.value
        updatedEvent(copy)
    }

    // 🦖🦖🦖 drop down is not appearing on edit. 🦩🦩🦩
    return (
        <form className="eventForm">
            <h2 className="eventForm__description">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" required autoFocus className="form-control" value={event.description}
                        onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" required className="form-control" value={event.date}
                        onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time" required className="form-control" min="1" max="50" value={event.time}
                        onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Pick the Game:</label>
                    <select className="form-control" name="gameId" value={event.gameId} required
                        onChange={changeEventState}>
                        <option value="0">Choose Game:</option>
                        {
                            games.map(game => {
                                return <option value={game.id} key={`game--${game.id}`}>{game.title}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit" onClick={evt => {
                // prevents the form from being submitted
                evt.preventDefault()

                const eventObj = {
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    game: parseInt(event.gameId)
                }
                // Send PUT request to API
                updateEvent(eventId, eventObj)
                    .then(() => navigate("/events"))
            }}
                className="btn btn-primary">Edit</button>
        </form>
    )

}
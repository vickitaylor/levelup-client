import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateGame, getGameTypes, getSingleGame } from "../../managers/GameManager";

export const EditGame = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    
    const [game, setGame] = useState({
        skillLevel: "",
        numberOfPlayers: "",
        title: "",
        maker: "",
        gameTypeId: ""
    })
    
    useEffect(() => {
        getSingleGame(gameId).then(data => setGame(data))
    },
        [gameId]
    )

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const copy = { ...game }
        copy[domEvent.target.name] = domEvent.target.value
        setGame(copy)
    }

    // for the name and value they need to match, if need to look at components to see how the case is
    // 🦖🦖🦖 drop down is not appearing on edit. 

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required autoFocus className="form-control" value={game.title}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker:</label>
                    <input type="text" name="maker" required className="form-control" value={game.maker}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players Needed:</label>
                    <input type="number" name="number_of_players" required className="form-control" min="1" max="50" value={game.number_of_players}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level:</label>
                    <input type="number" name="skill_level" required className="form-control" min="1" max="10" value={game.skill_level}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type:</label>
                    <select className="form-control" name="gameTypeId" value={game.gameTypeId} required onChange={changeGameState}>
                        <option value="0">Choose Game Type:</option>
                        {
                            gameTypes.map(type => {
                                return <option value={type.id} key={`type--${type.id}`}>{type.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit" onClick={evt => {
                // prevents the form from being submitted
                evt.preventDefault()

                const gameObj = {
                    maker: game.maker,
                    title: game.title,
                    number_of_players: parseInt(game.number_of_players),
                    skill_level: parseInt(game.skill_level),
                    game_type: parseInt(game.gameTypeId)
                }
                // Send PUT request to API
                updateGame(gameId, gameObj)
                    .then(() => navigate("/games"))
            }}
                className="btn btn-primary">Edit</button>
        </form>
    )
}
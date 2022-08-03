import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGameTypes } from "../../managers/GameManager";

export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    // default values, since the input fields are bound to the values of the properties of this state variable. 
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 1,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newGame = { ...currentGame }
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required autoFocus className="form-control" value={currentGame.title}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker:</label>
                    <input type="text" name="maker" required className="form-control" value={currentGame.maker}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players Needed:</label>
                    <input type="number" name="numberOfPlayers" required className="form-control" min="1" max="50" value={currentGame.numberOfPlayers}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level:</label>
                    <input type="number" name="skillLevel" required className="form-control" min="1" max="10" value={currentGame.skillLevel}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type:</label>
                    <select className="form-control" name="gameTypeId" value={currentGame.gameTypeId} required onChange={changeGameState}>
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

                const game = {
                    maker: currentGame.maker,
                    title: currentGame.title,
                    number_of_players: parseInt(currentGame.numberOfPlayers),
                    skill_level: parseInt(currentGame.skillLevel),
                    game_type: parseInt(currentGame.gameTypeId)
                }
                // Send POST request to API
                createGame(game)
                    .then(() => navigate("/games"))
            }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
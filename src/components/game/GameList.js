import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGames, deleteGame } from "../../managers/GameManager";

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const deleteButton = (id) => {
        deleteGame(id)
        .then(() => {
            getGames().then(setGames)
        })
    }

    return (
        <>
            <header>
                <button className="btn btn-2 btn sep icon-create" onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
                > Register New Game</button>
            </header>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker} <Link to={`/games/${game.id}/edit`}>⚙️</Link> <button onClick={() => {deleteButton(game.id)}}>❌</button></div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div><br />
                        </section>
                    })
                }
            </article>
        </>
    )

}

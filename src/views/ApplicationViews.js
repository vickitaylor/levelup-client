import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EditEvent } from "../components/event/EditEvent"
import { EventForm } from "../components/event/EventForm"
import { EventList } from "../components/event/EventList"
import { EditGame } from "../components/game/EditGame"
import { GameForm } from "../components/game/GameForm"
import { GameList } from "../components/game/GameList"
import { Authorized } from "./Authorized"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId/edit" element={<EditEvent />} />
                <Route path="/games/:gameId/edit" element={<EditGame />} />
            </Route>
        </Routes>
    </>
}

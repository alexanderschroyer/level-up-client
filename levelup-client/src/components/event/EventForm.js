import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createEvent } from "./EventManager"
import { getGames } from "../game/GameManager"


export const EventForm = () => {
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("lu_token"))
    const [games, setGames] = useState([])
    const [currentEvent, setEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",
        organizer: ""
    })

    useEffect(() => {
        getGames()
        .then(data => setGames(data)) // TODO: Get all existing games from API
    }, [])

    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required autoFocus className="form-control" placeholder="YYYY-MM-DD"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control" placeholder="00:00:00"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            {/* TODO: Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // TODO: Call the createEvent function and pass it the event object
                    createEvent(event)
                        .then(() => history.push("/events"))

                    // TODO: Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}

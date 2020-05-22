import React from 'react'

export default function CharacterDetailPage(props) {
    return (
        <div>
            Character {props.match.params.id}
        </div>
    )
}

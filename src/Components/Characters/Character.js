import React from "react";
import {Card, CardBody} from "reactstrap";

const Character = (props) => {

    // console.log("Character.js props.results", props.results);

    return (
        <React.Fragment>

            {props.results.length > 0 ? props.results.map((character) => {
                        // console.log("Character.js results.map character", character);
                    return (

                        <Card key={character.id} className="m-2 p-2">
                        <CardBody>
                            <p>{character.name}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Species: {character.species}</p>
                            <p>Status: {character.status}</p>
                            <p>Type: {character.type}</p>
                            <p>Location: {character.location.name}</p>
                            <p>Origin: {character.origin.name}</p>

                            <p>Episode(s): {character.episodesList}</p>
                        </CardBody>
                        </Card>
                    )
                })
                    : null}

        </React.Fragment>
    );
};

export default Character;

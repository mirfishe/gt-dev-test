import React from "react";
import {Card, CardBody} from "reactstrap";

const Episode = (props) => {

    // console.log("Episode.js props.results", props.results);

    return (
        <React.Fragment>

            {props.results.length > 0 ? props.results.map((episode) => {
                        // console.log("Episode.js results.map episode", episode);
                    return (

                        <Card key={episode.id} className="m-2 p-2">
                        <CardBody>
                            <p>{episode.name}</p>
                            <p>Episode: {episode.episode}</p>
                            <p>Air Date: {episode.air_date}</p>
                            <p>Character(s): {episode.charactersList}</p>
                        </CardBody>
                        </Card>
                    )
                })
                    : null}

        </React.Fragment>
    );
};

export default Episode;

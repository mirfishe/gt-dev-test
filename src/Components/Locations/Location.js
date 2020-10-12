import React from "react";
import {Card, CardBody} from "reactstrap";

const Location = (props) => {

    // console.log("Location.js props.results", props.results);

    return (
        <React.Fragment>

            {props.results.length > 0 ? props.results.map((location) => {
                        // console.log("Location.js results.map location", location);
                    return (

                        <Card key={location.id} className="m-2 p-2">
                        <CardBody>
                            <p>{location.name}</p>
                            <p>Dimension: {location.dimension}</p>
                            <p>Type: {location.type}</p>
                            <p>Resident(s): {location.residentsList}</p>
                        </CardBody>
                        </Card>
                    )
                })
                    : null}

            
        </React.Fragment>
    );
};

export default Location;

import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, FormGroup, Input, Button, Alert} from "reactstrap";
import Episode from "./Episode"

const Episodes = (props) => {

    // console.log("Episodes.js props.url", props.url);
    // console.log("Episodes.js props.paginationURL", props.paginationURL);
    // console.log("Episodes.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Episodes.js props.arrayLocations", props.arrayLocations);

    // Build lookup arrays
    const [arrayCharacters, setArrayCharacters] = useState([]);

    const [results, setResults] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [txtSearchEpisodeName, setTxtSearchEpisodeName] = useState("");
    const [txtEpisode, setTxtEpisode] = useState("");

    useEffect(() => {
        // console.log("Episodes.js useEffect props.arrayCharacters", props.arrayCharacters);
        setArrayCharacters(props.arrayCharacters);
    }, [props.arrayCharacters]);

    // useEffect(() => {
    //     // console.log("Episodes.js useEffect results", results);
    //     // console.log("Episodes.js useEffect results.length", results.length);
    // }, [results]);

    const searchEpisodes = () => {

        let searchURL = props.url;
        let searchString = "";
      
        if (txtSearchEpisodeName !== undefined) {
            if (txtSearchEpisodeName.length > 0) {
                searchString += "&name=" + txtSearchEpisodeName.replace(" ", "%20");
            };
        };
      
        if (txtEpisode !== undefined) {
            if (txtEpisode.length > 0) {
                searchString += "&episode=" + txtEpisode.replace(" ", "%20");
            };
        };
      
        if (searchString !== "") {
            console.log("Episodes.js searchEpisodes searchString", searchString);
            searchURL += "?" + searchString;
        };
      
        // console.log("Episodes.js searchEpisodes searchURL", searchURL);
      
        fetch(searchURL)
        .then(response => {
            // console.log("Episodes.js searchEpisodes response", response);
            // if (!response.ok) {
                // throw Error(response.status + " " + response.statusText + " " + response.url);
            // } else {
                // if (response.status === 200) {
                    return response.json();
                // } else {
                //     return response.status;
                // };
            // };
        })
        .then(data => {
            // console.log("Episodes.js searchEpisodes data", data);

            if (data.error !== undefined) {
                console.log("Episodes.js searchEpisodes data.error", data.error);
                setErrMessage(data.error);
            } else {

                for (let i = 0; i < data.results.length; i++) {
                    // console.log("Episodes.js searchEpisodes data.results[i].residents", data.results[i].residents);
                    let charactersList = "";
                    let charactersArray = data.results[i].characters;

                    for (let j = 0; j < charactersArray.length; j++) {
                        // console.log("Episodes.js searchEpisodes charactersArray[j]", charactersArray[j]);
                        for (let k = 0; k < arrayCharacters.length; k++) {
                            // console.log("Episodes.js searchEpisodes arrayCharacters[k]", arrayCharacters[k]);
                            if (charactersArray[j].substr(charactersArray[j].lastIndexOf("/") + 1) == arrayCharacters[k].id) {
                              // console.log("Episodes.js searchEpisodes character name", arrayCharacters[k].name, "it's a match");

                              break;
                            };
                          };

                          charactersList += charactersArray[j].substr(charactersArray[j].lastIndexOf("/") + 1);
                          if (j < charactersArray.length - 1) {
                            charactersList += ",";
                          };
                    };

                    // console.log("Episodes.js searchEpisodes charactersList", charactersList);
                    Object.assign(data.results[i], {charactersList: charactersList});

                };

                setResults(data.results);

            };
        })
        .catch(err => {
            console.log("Episodes.js searchEpisodes err", err);
            setErrMessage(err);
        });

    };

    return (
        <React.Fragment>
                {errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : ""}
                <Row className="m-2">
                    <FormGroup className="m-2">
                    <Input type="text" id="txtSearchEpisodeName" placeholder="Name" onChange={(event) => {/*console.log(event.target.value);*/ setTxtSearchEpisodeName(event.target.value);}} />
                    </FormGroup>
                    <FormGroup className="m-2">
                    <Input type="text" id="txtEpisode" placeholder="Episode" onChange={(event) => {/*console.log(event.target.value);*/ setTxtEpisode(event.target.value);}} />
                    </FormGroup>
                </Row>
                <Row className="m-2">
                <FormGroup className="m-2">
                    <Button id="btnSearchEpisodes" color="primary" size="lg" className="ml-4 m-2 p-2" onClick={searchEpisodes}>Search Episodes</Button>
                </FormGroup>
                </Row>
                {results.length > 0 ?
                <Row className="m-2">
                    <Container>
                        <Row className="justify-content-center">
                            <Episode results={results} />
                        </Row>
                    </Container>
                </Row>
                : null}
        </React.Fragment>
    );
};

export default Episodes;
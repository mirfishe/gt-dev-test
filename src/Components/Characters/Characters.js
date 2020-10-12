import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, FormGroup, Input, Button, Alert} from "reactstrap";
import Character from "./Character"

const Characters = (props) => {

    // console.log("Characters.js props.url", props.url);
    // console.log("Characters.js props.paginationURL", props.paginationURL);
    // console.log("Characters.js props.arrayEpisodes", props.arrayEpisodes);
    // console.log("Characters.js props.arraySearchSpecies", props.arraySearchSpecies);
    // console.log("Characters.js props.arraySearchCharacterTypes", props.arraySearchCharacterTypes);

    // Build lookup arrays
    const [arrayEpisodes, setArrayEpisodes] = useState([]);
    const [arraySearchSpecies, setArraySearchSpecies] = useState([]);
    const [arraySearchCharacterTypes, setArraySearchCharacterTypes] = useState([]);

    const [results, setResults] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [txtSearchCharacterName, setTxtSearchCharacterName] = useState("");
    const [ddSearchSpecies, setDdSearchSpecies] = useState("");
    const [ddSearchCharacterType, setDdSearchCharacterType] = useState("");
    const [ddSearchStatus, setDdSearchStatus] = useState("");
    const [ddSearchGender, setDdSearchGender] = useState("");

    useEffect(() => {
        // console.log("Characters.js useEffect props.arrayEpisodes", props.arrayEpisodes);
        setArrayEpisodes(props.arrayEpisodes);
    }, [props.arrayEpisodes]);

    useEffect(() => {
        // console.log("Characters.js useEffect props.arraySearchSpecies", props.arraySearchSpecies);
        setArraySearchSpecies(props.arraySearchSpecies);
        // buildSearchSpeciesLookup();
    }, [props.arraySearchSpecies]);

    useEffect(() => {
        // console.log("Characters.js useEffect props.arraySearchCharacterTypes", props.arraySearchCharacterTypes);
        setArraySearchCharacterTypes(props.arraySearchCharacterTypes);
    }, [props.arraySearchCharacterTypes]);

    // useEffect(() => {
    //     // console.log("Characters.js useEffect results", results);
    //     // console.log("Characters.js useEffect results.length", results.length);
    // }, [results]);

    const searchCharacters = () => {

        let searchURL = props.url;
        let searchString = "";
      
        if (txtSearchCharacterName !== undefined) {
            if (txtSearchCharacterName.length > 0) {
                searchString += "&name=" + txtSearchCharacterName.replace(" ", "%20");
            };
        };
      
        if (ddSearchStatus !== undefined) {
          if (ddSearchStatus !== "") {
            searchString += "&status=" + ddSearchStatus.replace(" ", "%20");
          };
        };
      
        if (ddSearchSpecies !== undefined) {
          if (ddSearchSpecies !== "") {
            searchString += "&species=" + ddSearchSpecies.replace(" ", "%20");
          };
        };
      
        if (ddSearchCharacterType !== undefined) {
          if (ddSearchCharacterType !== "") {
            searchString += "&type=" + ddSearchCharacterType.replace(" ", "%20");
          };
        };
      
        if (ddSearchGender !== undefined) {
          if (ddSearchGender !== "") {
            searchString += "&gender=" + ddSearchGender.replace(" ", "%20");
          };
        };
      
        if (searchString !== "") {
            console.log("Characters.js searchCharacters searchString", searchString);
            searchURL += "?" + searchString;
        };
      
        // console.log("Characters.js searchCharacters searchURL", searchURL);

        fetch(searchURL)
        .then(response => {
            // console.log("Characters.js searchCharacters response", response);
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
            // console.log("Characters.js searchCharacters data", data);

            if (data.error !== undefined) {
                console.log("Characters.js searchCharacters data.error", data.error);
                setErrMessage(data.error);
            } else {

                for (let i = 0; i < data.results.length; i++) {
                    // console.log("Characters.js searchCharacters data.results[i].residents", data.results[i].residents);
                    let episodesList = "";
                    let episodesArray = data.results[i].episode;

                    for (let j = 0; j < episodesArray.length; j++) {
                        // console.log("Characters.js searchCharacters episodesArray[j]", episodesArray[j]);
                        for (let k = 0; k < arrayEpisodes.length; k++) {
                            // console.log("Characters.js searchCharacters arrayEpisodes[k]", arrayEpisodes[k]);
                            if (episodesArray[j].substr(episodesArray[j].lastIndexOf("/") + 1) == arrayEpisodes[k].id) {
                              // console.log("Characters.js searchCharacters character name", arrayEpisodes[k].name, "it's a match");

                              break;
                            };
                          };

                          episodesList += episodesArray[j].substr(episodesArray[j].lastIndexOf("/") + 1);
                          if (j < episodesArray.length - 1) {
                            episodesList += ",";
                          };
                    };

                    // console.log("Characters.js searchCharacters episodesList", episodesList);
                    Object.assign(data.results[i], {episodesList: episodesList});

                };

                setResults(data.results);

            };
        })
        .catch(err => {
            console.log("Characters.js searchCharacters err", err);
            setErrMessage(err);
        });

    };

    return (
        <React.Fragment>
                {errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : ""}
                <Row className="m-2">
                <FormGroup className="m-2">
                <Input type="text" id="txtSearchCharacterName" placeholder="Name" onChange={(event) => {/*console.log(event.target.value);*/ setTxtSearchCharacterName(event.target.value);}} />
                </FormGroup>
                <FormGroup className="m-2">
                <Input type="select" id="ddSearchSpecies" onChange={(event) => {/*console.log(event.target.value);*/ setDdSearchSpecies(event.target.value);}}>
                    <option value="">Select Species</option>
                    {arraySearchSpecies.length > 0 ? arraySearchSpecies.map((species) => {
                        // console.log("Characters.js arraySearchSpecies.map species", species);
                    return (
                        <option key={species} value={species}>{species}</option>
                        )
                    })
                    : null}
                </Input>
                </FormGroup>
                <FormGroup className="m-2">
                <Input type="select" id="ddSearchCharacterType" onChange={(event) => {/*console.log(event.target.value);*/ setDdSearchCharacterType(event.target.value);}}>
                    <option value="">Select Type</option>
                    {arraySearchCharacterTypes.length > 0 ? arraySearchCharacterTypes.map((type) => {
                        // console.log("Characters.js arraySearchCharacterTypes.map type", type);
                    return (
                        <option key={type} value={type}>{type}</option>
                        )
                    })
                    : null}
                </Input>
                </FormGroup>
                <FormGroup className="m-2">
                <Input type="select" id="ddSearchStatus" onChange={(event) => {/*console.log(event.target.value);*/ setDdSearchStatus(event.target.value);}}>
                    <option value="">Select Status</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </Input>
                </FormGroup>
                <FormGroup className="m-2">
                <Input type="select" id="ddSearchGender" onChange={(event) => {/*console.log(event.target.value);*/ setDdSearchGender(event.target.value);}}>
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </Input>
                </FormGroup>
                </Row>
                <Row className="m-2">
                <FormGroup className="m-2">
                    <Button id="btnSearchCharacters" color="primary" size="lg" className="ml-4 m-2 p-2" onClick={searchCharacters}>Search Characters</Button>
                </FormGroup>
                </Row>
                {results.length > 0 ?
                <Row className="m-2">
                    <Container>
                        <Row className="justify-content-center">
                            <Character results={results} />
                        </Row>
                    </Container>
                </Row>
                : null}
        </React.Fragment>
    );
};

export default Characters;
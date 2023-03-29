import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

export const CreateReptile = () => {
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("");
    const [name, setName] = useState("");
    const api = useApi();
    const navigate = useNavigate();
    
 

    const createreptile = async () => {
        if (sex == "" || species == "") {
            console.log("You need to pick a species and sex!");
            return;
        }
        const resultBody = await api.post('/reptiles', {name,species,sex});

        if (resultBody.error) {
            console.log(resultBody.error);
        } 
        navigate('/dashboard', {replace: true});
    }
    
    return(<>
    <h2>I'm on the Create Reptile Page</h2>
    <form className="CreateRep">
        <label htmlFor="species1">Species:</label>
            <select name="species1" required>
                <option disabled selected></option>
                <option value={species} onClick={() => setSpecies("ball_python")}>Ball Python</option>
                <option value={species} onClick={() => setSpecies("king_snake")}>King Snake</option>
                <option value={species} onClick={() => setSpecies("corn_snake")}>Corn Snake</option>
                <option value={species} onClick={() => setSpecies("redtail_boa")}>Redtail Boa</option>
            </select>
        <label htmlFor="sex1">Sex:</label>
            <select name="sex1" required>
                <option disabled selected></option>
                <option value={sex} onClick={() => setSex("m")}>Male</option>
                <option value={sex} onClick={() => setSex("f")}>Female</option>
            </select>
        <label htmlFor="name1">Name:</label>
            <input name="name1" type="text" value={name} onChange={e => setName(e.target.value)}></input>
    <button onClick={createreptile}>Create New Reptile</button>

    </form>
    </>)
}
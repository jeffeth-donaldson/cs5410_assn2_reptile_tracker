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
    
 

    const createreptile = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault()
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
    <form className="signupPage" onSubmit={createreptile}>
    <h2 className="box">Create New Reptile</h2>
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
    <div className="space">
        <button type="submit">Create New Reptile</button>
    </div>

    </form>
    </>)
}
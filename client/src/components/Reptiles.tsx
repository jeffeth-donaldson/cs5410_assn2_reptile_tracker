import { Reptile } from "@prisma/client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
export const Reptiles = () => {

    const [reptiles, setReptiles] = useState<Reptile[]>([]);
    const [updated, setUpdated] = useState(false);
    const api = useApi();

    useEffect(()=> {
        api.get('/reptiles/mine')
            .then(response => {setReptiles(response || [])})
    }, [updated])

    return (
        <div className={"reptilesList"}>
            <h2 className="box">My Reptiles</h2>
            <table>
                <thead>
                    <tr><th>Reptile Number</th><th>Name</th><th>Species</th><th>Sex</th><th>Delete</th></tr>
                </thead>
                <tbody>
                {
                reptiles.map(r => {
                    return (
                        <tr key={r.id}>
                        <td><Link to={'/reptile/' + r.id}>{r.id}</Link></td>
                        <td>{r.name}</td>
                        <td>{r.species}</td>
                        <td>{r.sex}</td>
                        <td><button onClick={async () => {
                            await api.del('/reptiles/' + r.id);
                            setUpdated(!updated);
                        }}>Delete</button></td>
                        </tr>)
                })
                }
                </tbody>
            </table>
        </div>
    )

}
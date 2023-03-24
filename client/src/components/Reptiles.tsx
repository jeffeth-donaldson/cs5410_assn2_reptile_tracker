import { Reptile } from "@prisma/client"
import { useEffect, useState } from "react"
import { useApi } from "../hooks/useApi";
export const Reptiles = () => {

    const [reptiles, setReptiles] = useState<Reptile[]>([]);
    const api = useApi();

    useEffect(()=> {
        api.get('/reptiles/mine')
            .then(response => {setReptiles(response || [])})
    },[])
    return (
        <div className={"reptilesList"}>
            <h2>My Reptiles</h2>
            <table>
                <thead>
                    <tr><th>name</th><th>species</th><th>sex</th></tr>
                </thead>
                <tbody>
                {
                reptiles.map(r => {
                    return (<tr key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.species}</td>
                        <td>{r.sex}</td>
                        </tr>)
                })
                }
                </tbody>
            </table>
        </div>
    )

}
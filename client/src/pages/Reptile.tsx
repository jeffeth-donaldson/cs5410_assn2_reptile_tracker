import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

interface HusbandryRecordBody {
    id: number,
    length: number,
    weight: number,
    temperature: number,
    humidity: number
}

interface ScheduleBody {
    id: number
    type: "feed" | "record" | "clean",
    description: string, 	
    monday: boolean, 	
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
}

interface FeedingBody {
    foodItem: "large mouse" | "medium rat" | "medium rabbit",
}

function getId(id :string) {
    let lst = id.split("/");
    return lst[lst.length-1];
}

interface ReptileBody {
    species: "ball_python" | "king_snake" | "corn_snake" | "redtail_boa",
    name: string,
    sex: "m" | "f"
}

export const Reptile = () => {

    const api = useApi();
    const [reptile, setReptile] = useState<ReptileBody>();
    const [reptileId, setReptileId] = useState(getId(window.location.pathname));
    const [husbandryRecords, setHusbandryRecords] = useState<HusbandryRecordBody[]>([]);
    const [schedules, setSchedules] = useState<ScheduleBody[]>([]);
    const [feedings, setFeedings] = useState<FeedingBody[]>([]);
    const [error, setError] = useState("");

    // husbandry record input states
    const [humidity, setHumidity] = useState(0);
    const [length, setLength] = useState(0);
    const [temperature, setTemperature]  = useState(0);
    const [weight, setWeight]  = useState(0);
    

    // Feeding input states
    const [food, setFood] = useState("medium rat")

    //reptile update states
    const [sex, setSex] = useState("");
    const [species,setSpecies] = useState("");
    const [name, setName] = useState("");
    // schedule input states

    const [type,setType] = useState("feed");
    const [description, setDescription] = useState("");
    const [monday , setMonday] = useState(false);
    const [tuesday , setTuesday] = useState(false);
    const [wednesday , setWednesday] = useState(false);
    const [thursday , setThursday] = useState(false);
    const [friday , setFriday] = useState(false);
    const [saturday , setSaturday] = useState(false);
    const [sunday , setSunday] = useState(false);


    // gets all lists of schedules / husbandry records / feeding

    const Reptile = async () => {

        const reptile = await api.get('/reptiles/'+reptileId);
            // const resultBody = await api.get('/reptiles/mine');
            if (reptile.error) {
                console.log(reptile.error)
            } else {
                setError(reptile.message);
            }
            setName(reptile.name);
            setSex(reptile.sex)
            setSpecies(reptile.species)
            setReptile(reptile);


        const schedules = await api.get('/schedules/'+reptileId);
            if (schedules.error) {
                console.log(schedules.error)
            } else {
                setError(schedules.message);
            }
            setSchedules(schedules);

        const husbandryRecords = await api.get('/husbandryRecords/'+reptileId);
        if (husbandryRecords.error) {
            console.log(husbandryRecords.error)
        } else {
            setError(husbandryRecords.message);
        }
        setHusbandryRecords(husbandryRecords);

        const feedings = await api.get('/feedings/'+reptileId);
        if (feedings.error) {
            console.log(feedings.error)
        } else {
            setError(feedings.message);
        }
        setFeedings(feedings);

    }


    const postHusbandryRecord = async () =>{
        const postingHusbandryRecord = await api.post('/husbandryRecords/'+reptileId, {
            "humidity" : humidity,
            "length" : length,
            "temperature" : temperature,
            "weight" : weight
        });

        if (postingHusbandryRecord.error) {
            console.log(postingHusbandryRecord.error)
        } else {
            setHusbandryRecords(prev => [...prev, postingHusbandryRecord.husbandryRecord]);
            setError(postingHusbandryRecord.message);
        }

    }

    const postFeeding = async () =>{
        const postingFood = await api.post('/feedings/'+reptileId, {"foodItem" : food});

        if (postingFood.error) {
            console.log(postingFood.error)
        } else {
            setFeedings(prev => [...prev, postingFood.feeding]);
            setError(postingFood.message);
        }

    }

    const updateReptile = async () =>{
        const updatedReptile = await api.put('/reptiles/'+reptileId, {
            "species": species,
            "name": name,
            "sex": sex,
        });

        if (updatedReptile.error) {
            console.log(updatedReptile.error)
        } else {
            setError(updatedReptile.message);
        }
        setReptile(updatedReptile.updatedReptile)

    }

   const postSchedule = async () => {
    const postingSchedule = await api.post('/schedules/'+reptileId,{
        "type": type,
        "description": description,
        "monday": monday,
        "tuesday": tuesday,
        "wednesday": wednesday,
        "thursday": thursday,
        "friday": friday,
        "saturday": saturday,
        "sunday": sunday
    });
    if (postingSchedule.error) {
        console.log(postingSchedule.error)
    } else {
        setSchedules(prev => [...prev, postingSchedule.schedule]);
        setError(postingSchedule.message);
    }

   }


    useEffect(() => {
        Reptile();
    }, []);

    return(<>
    <h2>Records for reptile</h2>

    <div className="split">
        <div className="section">
            <p>Name: {reptile && reptile.name} || Species: {reptile && reptile.species} || Sex: {reptile && reptile.sex}</p>
            <br />
            <p>Name</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <hr />
            <div className="vert">
                <p>Species</p>
                <span>
                    <input type="radio" onChange={e=> setSpecies(e.target.value)} name="species" id="ball_python" value="ball_python"/>
                    <label htmlFor="ball_python">ball_python</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setSpecies(e.target.value)}name="species" id="king_snake" value="king_snake"/>
                    <label htmlFor="king_snake">king_snake</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setSpecies(e.target.value)}name="species" id="corn_snake" value="corn_snake"/>
                    <label htmlFor="corn_snake">corn_snake</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setSpecies(e.target.value)}name="species" id="redtail_boa" value="redtail_boa"/>
                    <label htmlFor="redtail_boa">redtail_boa</label>
                </span>
            </div>
            <hr />
            <div className="vert">
                <p>Sex</p>
                <span>
                    <input type="radio" onChange={e=> setSex(e.target.value)} name="sex" id="m" value="m"/>
                    <label htmlFor="m">Male</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setSex(e.target.value)} name="sex" id="f" value="f"/>
                    <label htmlFor="f">Female</label>
                </span>
            </div>
            <hr />
            <button onClick={ () => {updateReptile()} }>Update Reptile</button>
        </div>

        <div className="section">
            <h3>Husbandry Records</h3>
            <div className="vert">
                <h4>Add a record</h4>
                <p>(default 0 if left empty)</p>
                <input type="text" onChange={e => setHumidity(parseFloat(e.target.value) || 0) } placeholder="Humidity in percentage ex. 23" />
                <input type="text" onChange={e => setLength(parseFloat(e.target.value) || 0) } placeholder="Length"/>
                <input type="text" onChange={e => setTemperature(parseFloat(e.target.value) || 0) } placeholder="Temperature"/>
                <input type="text" onChange={e => setWeight(parseFloat(e.target.value) || 0) } placeholder="Weight"/>
                <button onClick={ () => {postHusbandryRecord()}
                }>Add record</button>
            </div>
            { husbandryRecords && husbandryRecords.map( (husbandryRecord) => { return <HusbandryRecordsCard 
            id = {husbandryRecord.id} 
            key = {husbandryRecord.id} 
            humidity = {husbandryRecord.humidity}
            length = {husbandryRecord.length}  
            temperature = {husbandryRecord.temperature}  
            weight = {husbandryRecord.weight}/>})}
        </div>

        <div className="section">
            <h3>Feedings</h3>
            <div className="vert">
                <h4>Add a food</h4>
                <p>(default medium rat if no selection)</p>
                <span>
                    <input type="radio" onChange={e=> setFood(e.target.value)} value={"large mouse"} name="foods" id="food1" />
                    <label htmlFor="food1">A large mouse</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setFood(e.target.value)} value={"medium rat"} name="foods" id="food2"/>
                    <label htmlFor="food2">A medium rat</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setFood(e.target.value)} value={"medium rabbit"} name="foods" id="food3"/>
                    <label htmlFor="food3">A medium rabbit</label>
                </span>
                <button onClick={ () => {postFeeding()}
                }>Add Food</button>
            </div>
            <>{ feedings && feedings.map( feeding =>
            <div>A tasty: {feeding.foodItem}</div>
        )}</>
        </div >

        <div className="section">
            <h3>Schedules</h3>
            <h4>Add a Schedule</h4>
            <div className="vert">
                <p>Task to Schedule</p>
                <span>
                    <input type="radio" onChange={e=> setType(e.target.value)} value={"feed"} name="types" id="type1" />
                    <label htmlFor="type1">Feed</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setType(e.target.value)} value={"record"} name="types" id="type2"/>
                    <label htmlFor="type2">Record</label>
                </span>
                <span>
                    <input type="radio" onChange={e=> setType(e.target.value)} value={"clean"} name="types" id="type3"/>
                    <label htmlFor="type3">Clean</label>
                </span>
            </div>
            <hr />
            <div className="vert">
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="description"/>
            </div>
            <hr />
            <div className="vert">
                <p>Days</p>
                <span>
                    <input type="checkbox" onChange={e=> setMonday(e.target.checked)} name="days" id="monday" />
                    <label htmlFor="monday">monday</label>
                </span>
                <span>
                    <input type="checkbox" onChange={e=> setTuesday(e.target.checked)} name="days" id="tuesday" />
                    <label htmlFor="tuesday">tuesday</label>
                </span>
                <span>
                    <input type="checkbox" onChange={e=> setWednesday(e.target.checked)} name="days" id="wednesday" />
                    <label htmlFor="wednesday">wednesday</label>
                </span>
                <span>
                    <input type="checkbox" onChange={e=> setThursday(e.target.checked)} name="days" id="thursday" />
                    <label htmlFor="thursday">thursday</label>
                </span>
                <span>
                    <input type="checkbox" onChange={e=> setFriday(e.target.checked)} name="days" id="friday" />
                    <label htmlFor="friday">friday</label>
                </span>
                <span>
                    <input type="checkbox" onChange={e=> setSaturday(e.target.checked)} name="days" id="saturday" />
                    <label htmlFor="saturday">saturday</label>
                </span>
                <span>
                    <input type="checkbox" onChange={e=> setSunday(e.target.checked)} name="days" id="sunday" />
                    <label htmlFor="sunday">sunday</label>
                </span>
                <button onClick={() => postSchedule()}>Add Schedule</button>
            </div>

            { schedules && schedules.map( (schedule) => { return <ScheduleCard 
            id = {schedule.id} 
            key = {schedule.id} 
            type = {schedule.type}
            description = {schedule.description}
            monday = {schedule.monday}
            tuesday = {schedule.tuesday}
            wednesday = {schedule.wednesday}
            thursday = {schedule.thursday}
            friday = {schedule.friday}
            saturday = {schedule.saturday}
            sunday = {schedule.sunday}
            />})}
        </div>
    </div>
    </>)
}

function HusbandryRecordsCard(props: HusbandryRecordBody) {
    return (
      <div className='hr'>
        <ul>
            <li>Humidity: {props.humidity}</li>
            <li>Length: {props.length}</li>
            <li>Temperature: {props.temperature}</li>
            <li>Weight: {props.weight}</li>
        </ul>
      </div>
    );
}

function ScheduleCard(props: ScheduleBody) {
    return (
      <div className='hr'>
        <ul>
            <li> Type: {props.type} </li>
            <li> Description: {props.description} </li> 	
            <li> Monday: {String(props.monday)} </li>  	
            <li> Tuesday: {String(props.tuesday)} </li> 
            <li> Wednesday: {String(props.wednesday)} </li>
            <li> Thursday: {String(props.thursday)} </li> 
            <li> Friday: {String(props.friday)} </li>
            <li> Saturday: {String(props.saturday)} </li> 
            <li> Sunday: {String(props.sunday)} </li>
        </ul>
      </div>
    );
}
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";

const MyButton =({count, setCount})=>{
    console.log("Count",count);
    return(
        <div className="d-flex">
        <Button onClick={() => setCount(count = count + 1)}>+ 1</Button>
        <h2>{count}</h2>
        <Button onClick={() => setCount(count = count - 1)}>- 1</Button>
        </div>
    )
}

export default MyButton
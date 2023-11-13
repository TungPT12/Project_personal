import { useParams } from "react-router-dom";


function Parameter() {

    const param = useParams();

    return (
        <>
            <h1>{param.id}</h1>
        </>
    );
}

export default Parameter;
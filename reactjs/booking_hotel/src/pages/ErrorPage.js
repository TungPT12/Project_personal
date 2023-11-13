import { useRouteError } from "react-router-dom";



function ErrorComponent1() {
    const error = useRouteError();
    console.log(error)
    return (
        <>
            <h1>Looix</h1>
            {/* <h1>{error ? error.message : "Tung"}</h1> */}
            <h1>Looix</h1>
            <h1>Looix</h1>
            <h1>Looix</h1>
        </>
    );
}

export default ErrorComponent1;
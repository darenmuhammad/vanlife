import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.log(error);
    return (
        <>
            <h1>{error.message}</h1>
            <h1>status: {error.status}</h1>
        </>
    );
}

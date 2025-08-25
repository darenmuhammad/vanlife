import { useState, Suspense } from "react";
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await,
} from "react-router-dom";
import { getVans } from "../../api";

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
    return defer({ vans: getVans() });
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dataPromise = useLoaderData();

    const typeFilter = searchParams.get("type");

    const handleFilterChange = (key, value) => {
        setSearchParams((prevFilter) => {
            if (value === null) {
                prevFilter.delete(key);
            } else {
                prevFilter.set(key, value);
            }
            return prevFilter;
        });
    };

    function renderVanElements(loadedVans) {
        const displayedVans = typeFilter
            ? loadedVans.filter((van) => van.type === typeFilter)
            : loadedVans;

        const vanElements = displayedVans.map((van) => (
            <div key={van.id} className="van-tile">
                <Link
                    to={van.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter,
                    }}
                    aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
                >
                    <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>
                            ${van.price}
                            <span>/day</span>
                        </p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                </Link>
            </div>
        ));

        return (
            <>
                <div className="van-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={`${
                            typeFilter === "rugged" ? "selected" : null
                        } van-type rugged`}
                    >
                        Rugged
                    </button>
                    <button
                        onClick={() => handleFilterChange("type", "simple")}
                        className={`${
                            typeFilter === "simple" ? "selected" : null
                        } van-type simple`}
                    >
                        Simple
                    </button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={`${
                            typeFilter === "luxury" ? "selected" : null
                        } van-type luxury`}
                    >
                        Luxury
                    </button>
                    {typeFilter && (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <div className="van-list">{vanElements}</div>;
            </>
        );
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
            </Suspense>
        </div>
    );
}

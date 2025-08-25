import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login, {
    loader as loginLoader,
    action as loginAction,
} from "./pages/Login";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import HostVans, { loader as hostVanLoader } from "./pages/Host/HostVans";
import HostVansDetail, {
    loader as hostVanDetailLoader,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import Reviews from "./pages/Host/Reviews";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import Error from "./components/Error";
import { requireAuth } from "./utils";

import "./server";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
                path="login"
                element={<Login />}
                loader={loginLoader}
                action={loginAction}
            />
            <Route
                path="vans"
                element={<Vans />}
                loader={vansLoader}
                errorElement={<Error />}
            />
            <Route
                path="vans/:id"
                element={<VanDetail />}
                loader={vanDetailLoader}
            />
            <Route path="host" element={<HostLayout />}>
                <Route
                    index
                    element={<Dashboard />}
                    loader={dashboardLoader}
                    errorElement={<Error />}
                />
                <Route
                    path="income"
                    element={<Income />}
                    loader={async ({ request }) => await requireAuth(request)}
                    errorElement={<Error />}
                />
                <Route
                    path="vans"
                    element={<HostVans />}
                    loader={hostVanLoader}
                    errorElement={<Error />}
                />
                <Route
                    path="vans/:id"
                    element={<HostVansDetail />}
                    loader={hostVanDetailLoader}
                    errorElement={<Error />}
                >
                    <Route
                        index
                        element={<HostVanInfo />}
                        loader={async ({ request }) =>
                            await requireAuth(request)
                        }
                        errorElement={<Error />}
                    />
                    <Route
                        path="pricing"
                        element={<HostVanPricing />}
                        loader={async ({ request }) =>
                            await requireAuth(request)
                        }
                        errorElement={<Error />}
                    />
                    <Route
                        path="photos"
                        element={<HostVanPhotos />}
                        loader={async ({ request }) =>
                            await requireAuth(request)
                        }
                        errorElement={<Error />}
                    />
                </Route>
                <Route
                    path="reviews"
                    element={<Reviews />}
                    loader={async ({ request }) => await requireAuth(request)}
                    errorElement={<Error />}
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

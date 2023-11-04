import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes,} from 'react-router-dom';
import useFetch from "./hooks/UseFetch";

function App() {
    const url = '/data.json'
    const {data, isLoading, error} = useFetch(url)

    if (error) {
        return <h1> Error Loading...</h1>
    }
    // will be use ui lib
    return (
        <>
            {isLoading
                ? <div> Is Loading...</div>
                : <Router>
                    <table>
                        <tbody>
                        <tr>
                            {data.map((tab) => (
                                <td key={tab.id}>
                                    <Link to={`/${tab.path}`}>{tab.title}</Link>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>

                    <Routes>
                        {data.map((tab) => (
                            <Route
                                key={tab.id}
                                path={`/${tab.path}`}
                                element={tab.id}
                            />
                        ))}
                    </Routes>
                </Router>
            }
        </>

    );
}

export default App;

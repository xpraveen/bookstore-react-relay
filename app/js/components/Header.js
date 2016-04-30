import React from "react";

import {Link} from "react-router";

export default class HelloWorld extends React.Component {

    render() {
        return (
            <div className="header">
                <h1>Library App</h1>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <a>Home</a>
                                </li>
                                <li>
                                    <a>Add Book</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );

    }
}

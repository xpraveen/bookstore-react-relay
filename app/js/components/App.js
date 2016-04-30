import React from "react";
import Relay from "react-relay";

import Header from "./Header";
import Books from "./Books";
import AddBook from "./AddBook";

class App extends React.Component {


    handleChange = (event) => {
        const query = event.target.value;
        this.setState({query});
    }

    render() {
        const {library} = this.props;

        return (
            <div className="lib-app">
                <Header library={library} />
                <input type="text" onChange={this.handleChange}/>
                <Books library={library}/>
                <AddBook library={library}/>
            </div>
        );
    }
}


export default Relay.createContainer(App, {

    fragments: {
        library: () => Relay.QL `
            fragment on Library{
                ${AddBook.getFragment("library")}
                ${Books.getFragment("library")}
            }
        `
    }
});

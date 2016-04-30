import React from "react";
import Relay from "react-relay";
import AddBookMutation from "../mutations/AddBookMutation";

class AddBook extends React.Component {

    handleBookAdd = (event) => {
        event.preventDefault();

        console.log("this.title: ", this.title.value);

        const onSuccess = (response) => {
            console.log("Mutation successful!: response: ", response);
        };
        const onFailure = (transaction) => {
            let error = transaction.getError() || new Error("Mutation failed.");
            console.error(error);
        };

        const mutation = new AddBookMutation({title: this.title.value, library: this.props.library});

        Relay.Store.commitUpdate(mutation, {onFailure, onSuccess});
    }

    render() {
        return (
            <div className="container">
                <h1>Add Book</h1>
                <form className="add-book form" onSubmit={this.handleBookAdd}>
                    <input type="text" ref={c => this.title = c} className="form-control" id="title" placeholder="Add a Book Title"/>
                    <button type="submit" className="btn btn-default">Add Book</button>
                </form>
            </div>
        );
    }
}

export default Relay.createContainer(AddBook, {
    fragments: {
        library: () => Relay.QL `
            fragment on Library{
                id
            }
        `
    }
});

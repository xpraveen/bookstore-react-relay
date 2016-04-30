import React from "react";
import Relay from "react-relay";
import Book from "./Book";

class Books extends React.Component {

    componentWillReceiveProps(nextProps) {
        const {query} = nextProps;
        this.props.relay.setVariables({"filter": query});
    }
    render() {
        //const {query} = this.props;
        const {books} = this.props.library;

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.edges.map((book, index) => {
                            book = book.node;
                            return (<Book key={book.id} book={book} index={index + 1}/>);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Relay.createContainer(Books, {
    initialVariables: {
        limit: 99999,
        filter: null
    },
    fragments: {
        library: () => Relay.QL `
            fragment on Library{
                books(first:$limit){
                    edges{
                      node{
                        id,
                        ${Book.getFragment("book")}
                      }
                    }
                  }
            }
        `
    }
});

import React from "react";
import Relay from "react-relay";

class Book extends React.Component {

    render() {
        const {index, book} = this.props;
        return (
            <tr>
                <th scope="row">{index}</th>
                <td>{book.title}</td>
            </tr>
        );
    }
}

export default Relay.createContainer(Book, {
    fragments: {
        book: () => Relay.QL `
            fragment on Book{
                title
            }
        `
    }
});

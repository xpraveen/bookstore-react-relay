import Relay from "react-relay";

export default class AddBookMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL `mutation CreateBookMutation{createBook}`;
    }

    getVariables() {
        return {title: this.props.title};
    }

    getFatQuery() {
        return Relay.QL `
        fragment on CreateBookPayload{
            library{
                books
            }
            bookEdge
        }
    `;
    }

    getConfigs() {
        return [
            {
                type: "RANGE_ADD",
                parentName: "library",
                parentID: this.props.library.id,
                connectionName: "books",
                edgeName: "bookEdge",
                rangeBehaviors: {
                    "": "append"
                }
            }
        ];
    }
}

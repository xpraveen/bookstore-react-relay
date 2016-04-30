import Relay from "react-relay";

export default class LibraryRoute extends Relay.Route {
    static routeName = "LibraryRoute";
    static queries = {
        library: () => Relay.QL `
            query{
                library
            }
        `
    };
}

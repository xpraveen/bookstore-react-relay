import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} from "graphql";

import {
    globalIdField,
    toGlobalId,
    fromGlobalId,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection
} from "graphql-relay";

import {getBooks, addBook} from "./database";

class Library {}

let library = new Library();

let {nodeInterface, nodeField} = nodeDefinitions((globalId) => {
    let {type, id} = fromGlobalId(globalId);

    switch (type) {
        case "Library":
            return library;
        default:
            return null;
    }

}, (obj) => {
    if (obj instanceof Library) {
        return libraryType
    }
    return null
});

let bookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => toGlobalId("Book", obj.id)
        },
        title: {
            type: GraphQLString
        },
        pubDate: {
            type: GraphQLString
        }
    })
});

const bookConnection = connectionDefinitions({name: "Book", nodeType: bookType});

const libraryType = new GraphQLObjectType({
    name: "Library",
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField("Library"),
        "books": ({
            type: bookConnection.connectionType,
            args: {
                ...connectionArgs,
                query: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => {
                return connectionFromArray(getBooks(args), args);
            }
        })
    })
});

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        library: {
            type: libraryType,
            resolve: () => (library)
        }
    })
});

let createBookMutation = mutationWithClientMutationId({
    name: "CreateBook",
    inputFields: {
        title: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    //This define the Payload fragment.
    outputFields: {
        bookEdge: {
            type: bookConnection.edgeType,
            resolve: (book) => {
                console.log("book: ", book);
                const edge = {
                    cursor: cursorForObjectInConnection(getBooks(), book),
                    node: book
                };

                console.log("Created edge: ", edge);
                return edge;
            }
        },

        library: {
            type: libraryType,
            resolve: () => library
        }
    },
    mutateAndGetPayload: ({title}) => {

        console.log("Adding book with title: ", title);
        const addedBook = addBook(title);
        console.log("addedBook: ", addedBook);
        return addedBook;
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({createBook: createBookMutation})
});

let schema = new GraphQLSchema({query, mutation});

export default schema;

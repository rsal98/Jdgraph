# Dgraph

## Steps to get you started

1. Git clone the repository.
2. Install Angular using the link : https://www.codingforentrepreneurs.com/blog/angular-setup-guide/
3. Install Spring using the link : https://www.codejava.net/ides/eclipse/install-spring-tool-suite-for-existing-eclipse-ide
4. Install all the node modules using npm install.
5. Start the node server using ng serve or npm start.
6. Start the spring application.
7. Hola! you are ready to go. Have fun exploring all the features.

## Add Schema
This function can be used to add schema in our data base. Example:

industry: string @index(term) .
boss_of: [uid] .
name: string @index(exact, term) .
works_for: [uid] .
work_here: [uid] .

Just fill in predicate and its corresponding type and we are good to go.

## Define Type
This helps the dgraph to create connections between existing predicates. Example:

type Person {
    name: string
    boss_of:[Person]
    works_for:[Company]
}

type Company {
    name: string
    industry: String
    work_here: [Person]
}

Here we are defining a Person and Company type which contain a bunch of predicates, this will automaticaly create edges between the nodes when we will enter data.

## Add Data

This is used to add data into the data base and the follows key can be used to add a connection between the nodes.

## Add Data Using Type

This can be used to enter data to make connection using the types defined in Define Type section.
Simply choose the type of data and then fill in the needed details. For connection just choose the node number in the given option, this will create an edge of the given type.

## Make Edge

This can be used to create edge between two nodes. Simply choose the nodes and the type of connection.

## Query

This can be used to retrieve data from the database.
Choose the type of query you wana make and the predicate you want to apply it on, input value can be used when we are using comparitive query type example less than, greater than etc.
After forming the query simply choose the the values to be returned.

## Upsert 

This function can be udes to update the existing data. Just choose the predicate and its corresponding value in the query block, then enter the new valuse in the mutation block, this will update the existing node if and if no such node exists then it will create a new node with mutation block values.

## Delete

Using this you can delete predicates of a specific node and even the complete node, just choose the node you want to delete and the predicates that are to be deleted in that node.

## Bulk Upload

This can be used to upload to large amount of data, just upload the rdf file link and the schema file and press submit.

## Create New User

This allows the admin to create new users.

## Delete User

This allows to delete users.

## Show User Info

This can be used to retrieve information about the user.

## Update User Password

This can be used to change the password of the existing users.

## Create new Group

This can be used to create a group. It allows the admin to give read,write or modify permissions to a group on a certain predictate. The users belonging to acertain group can only read , write or modify the predicate depending upon the group permissions.

## Delete Group

This can be used to delete a group by its groupId.

## Assign User to Group

This can be used to assign a user to a group.

## Group Info

This can be used to retrieve information about the group.

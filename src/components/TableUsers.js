import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const TableUsers = ({ users, showUserInfo, showEditUserForm, deleteUser }) => {
    if (!users.length) return <h1>Here is no data</h1>;

    let columns = [
        //get all the fields name to create the table head
        ...new Set(
            users
                .map(user =>
                    Object.entries(user)
                        .map(el => el[0])
                        .filter(el => el !== "id")
                )
                .flat(1)
        )
    ];

    const header = columns.map(field => <th key={field}>{field}</th>);
    const tableRows = users.map((user, i) => (
        <tr key={user.id}>
            <td>
                <Button variant="link" onClick={() => showUserInfo(user)}>
                    View
                </Button>
            </td>
            <td>
                {" "}
                <Button variant="link" onClick={()=>showEditUserForm(user)}>
                    Edit
                </Button>
            </td>
            {columns.map(col =>
                col === "empActive" ? (
                    <td key={col} className="align-middle">
                        {user[col] ? "Yes" : "No"}
                    </td>
                ) : (
                    <td key={col} className="align-middle">
                        {user[col]}
                    </td>
                )
            )}
            <td>
                {" "}
                <Button variant="link" onClick = {()=>deleteUser(user)}>Delete</Button>
            </td>
        </tr>
    ));
    return (
        <Table striped bordered size="sm" responsive="sm">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    {header}
                    <th></th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </Table>
    );
};

export default TableUsers;

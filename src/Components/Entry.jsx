import React from "react";

const Entry = (props) => {

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.author_name ? props.author_name[0] : "-"}</td>
            <td>{props.first_publish_year ? props.first_publish_year : "-"}</td>
            <td>{props.edition_count}</td>
        </tr>
    )
}

export default Entry;
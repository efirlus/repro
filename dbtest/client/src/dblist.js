import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class DBlist extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.path}</TableCell>
                <TableCell>{this.props.addeddate}</TableCell>
                <TableCell>{this.props.isdeleted}</TableCell>
                <TableCell>{this.props.ismodified}</TableCell>
            </TableRow>
        )
    }
}


export default DBlist;
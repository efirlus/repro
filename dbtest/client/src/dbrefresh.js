import React from 'react';


class DBlistRefresh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            open: true
        });
    }

    refreshlist = async () => {
        await fetch('/db', {
            method: 'POST'
        });

        await this.props.stateRefresh();
    }

    render() {
        return (
            <button onClick={(e) => {this.refreshlist()}}>갱신</button>
        )
    }
}

export default DBlistRefresh;
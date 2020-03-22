import React, { Component } from 'react';
import './App.css';
import socketioclient from 'socket.io-client';

import DBlist from './dblist'
import DBlistRefresh from './dbrefresh'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
//import CustomerAdd from './components/CustomerAdd';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
//import {response} from 'express';

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  
  paper: {
    marginLeft: 18,
    marginRight: 18
  },

  progress: {
    margin: theme.spacing.unit * 2
  },
  
  grow: {
    flexGrow: 1,
  },
  
  tableHead: {
    fontSize: '1.0rem'
  },
  
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filelist: '',
      completed: 0,
      endpoint: 'http://localhost:5000'
    }
    //this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  /*
  stateRefresh() {
    this.setState({
      filelist: '',
      completed: 0
    });

    this.callDBlist()
      .then(res => this.setState({filelist: res}))
      .catch(err => console.log(err));
  }
  */

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    
    const {endpoint} = this.state;
    const socket = socketioclient(endpoint);
    socket.on('outgoing', data => {
      //const body = data.json();
      this.setState({filelist: data})})
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  };


  render() {
    const { classes } = this.props;
/*
    const refreshfilelist = (data) => {
      return data.map((c) => {
        return <DBlist stateRefresh={this.stateRefresh} key={c.id} id={c.id} path={c.path} addeddate={c.addeddate} isdeleted={c.isdeleted} ismodified={c.ismodified} />
      });
    }
*/
    const cellList = ["번호","경로","날짜","삭제","변형"]
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Openn drawer">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              어플리케이션
            </Typography>
            <div>
              <div>
                <SearchIcon />
              </div>
              <InputBase placeholder="검색" />
            </div>
          </Toolbar>
        </AppBar>

        <div className={classes.menu}>
          <DBlistRefresh stateRefresh={this.stateRefresh} />
        </div>
        
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map (c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.filelist ? this.state.filelist.map(c => {
                return <DBlist key={c.id} id={c.id} path={c.path} addeddate={c.addeddate} isdeleted={c.isdeleted} ismodified={c.ismodified} />
              }): 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
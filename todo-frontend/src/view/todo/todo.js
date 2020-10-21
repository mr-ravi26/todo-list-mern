import React, { useState, useEffect } from "react";
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core'
import Row from './row';
import ToDoStyled from './todo.style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';

import api_instance from '../../utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  }
}));

const NestedList = () => {

  const classes = useStyles();
  let [todoList, setTodoList] = useState([]);
  let [sortedList, setSortedList] = useState([]);
  let [todo, setTodo] = useState("");
  let [toDoObj, setToDoObj] = useState({});
  let [counter, setCounter] = useState(0);

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  }

  let makeTree = (list, parent) => {
    let node = [];
    node = _.filter(list, function (o) {
      if (o.parent)
        return o.parent._id === parent;

      return o.parent === null;
    });

    let lookup = _.keyBy(node, function (o) { return o._id });

    let filteredList = _.filter(list, function (u) {
      return !lookup[u._id];
    });


    _.forEach(node, function (value) {
      if (filteredList.length > 0) {
        value.children = makeTree(filteredList, value._id)
      }
      else {
        value.children = [];
      }
    });

    console.log("node", node)
    return node;
  }

  const setList = (listArray, reorder = true) => {
    let arrayFromObject = makeTree(listArray, null);

    if (reorder) {
      arrayFromObject.sort(function compare(a, b) {
        var dateA = new Date(a.mod_date);
        var dateB = new Date(b.mod_date);
        return dateB - dateA;
      });
    }

    setSortedList(arrayFromObject);
    setCounter(counter++);
  }

  const listAllToDos = () => {
    try {
      api_instance.get('/api/todo')
        .then(function (response) {
          if (response && response.data && response.data.success) {
            setList(response.data.todos);
          }
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {
          // finally block
        });
    } catch (error) {
      console.error(error);
    }
  }

  const editTask = (todoObject) => {
    setTodo(todoObject.subject);
  }

  const clearToDo = () => {
    setToDoObj({});
    setTodo("");
  }

  const saveSubTask = (subtodo) => {
    let saveObj = {
      subject: subtodo.subject
    }

    if (subtodo.id) {
      saveObj.id = subtodo._id;
    }

    if (subtodo.parent) {
      saveObj.parent = subtodo.parent;
    }

    save(subtodo);
  }

  const preSave = () => {
    let saveObj = {
      subject: todo
    }

    if (toDoObj && toDoObj._id) {
      saveObj.id = toDoObj._id;
    }

    if (toDoObj && toDoObj.parent) {
      saveObj.parent = toDoObj.parent;
    }

    save(saveObj);
  }

  const save = (saveObj) => {
    api_instance.post('/api/todo', saveObj)
      .then(function (response) {
        if (response && response.data && response.data.success) {
          /// update values in state, just trying to avoid calling Get API again 
          let newArray = todoList;
          let index = _.findIndex(newArray, { _id: response.data.todo._id });

          if (index > -1) {
            newArray.splice(index, 1, response.data.todo);
          }
          else {
            newArray.push(response.data.todo);
          }
          setList(newArray);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateStatus = (row) => {
    api_instance.put('/api/todo/status', {
      _id: row._id
    })
      .then(function (response) {
        console.log(response);
        if (response && response.data && response.data.success) {
          /// update values in state, just trying to avoid calling Get API again 
          let newArray = todoList;
          let index = _.findIndex(newArray, { _id: response.data.todo._id });

          if (index > -1) {
            newArray.splice(index, 1, response.data.todo);
          }
          else {
            newArray.push(response.data.todo);
          }
          setList(newArray, false);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteTask = (row) => {
    api_instance.delete('/api/todo/' + row._id)
      .then(function (response) {
        if (response && response.data && response.data.success) {
          /// update values in state, just trying to avoid calling Get API again 
          let newArray = todoList;
          let index = _.findIndex(newArray, { _id: response.data.todo._id });

          if (index > -1) {
            newArray.splice(index, 1);
          }

          let filteredList = _.filter(newArray, function (u) {
            return u.parent._id === response.data.todo._id;
          });

          setList(filteredList);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    listAllToDos();
  }, []);

  return (
    <ToDoStyled>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item >
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Add a To do"
              inputProps={{ 'aria-label': 'add a to do' }}
              value={todo}
              onChange={handleTodoChange}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={preSave}>
              <CheckIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="secondary" className={classes.iconButton} aria-label="directions" onClick={clearToDo}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item >
          <Divider className={classes.divider} />
        </Grid>

        <Grid item >
          <Paper className={classes.root}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>To Do List</TableCell>
                    <TableCell colSpan={3} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedList.map((row) => (
                    <Row
                      key={row._id}
                      row={row}
                      updateStatus={updateStatus}
                      deleteTask={deleteTask}
                      editTask={editTask}
                      saveSub={saveSubTask}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </ToDoStyled>
  );
}



const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

const mapStateToProps = (state) => ({
  signin: state.authState.login,
  signup: state.authState.create
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(NestedList);

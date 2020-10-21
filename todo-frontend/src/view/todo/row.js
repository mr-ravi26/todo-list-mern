import React, { useState, useEffect } from "react";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  rootAdd: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
    marginLeft: 50,
    [theme.breakpoints.down('sm')]: {
      width: '80%',
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [addSubTask, setAddSubTask] = React.useState(false);
  let [subToDo, setSubTodo] = useState({ _id: "", subject: "", parent: row._id });



  const classes = useRowStyles();

  const handleChange = (row) => event => {
    props.updateStatus(row);
  }

  const handleDelete = (row) => event => {
    props.deleteTask(row);
  }

  const handleEdit = (row) => event => {
    // props.editTask(row);
    setAddSubTask(true);
    setSubTodo({
      ...subToDo,
      subject: row.subject,
      _id: row._id
    });
  }

  const handleAddSub = (row) => event => {
    setAddSubTask(!addSubTask);
    setSubTodo({
      ...subToDo,
      subject: ""
    });
  }

  const handleShowHide = (row) => event => {
    setOpen(!open);
  }

  const handleTodoChange = (event) => {
    setSubTodo({
      ...subToDo,
      subject: event.target.value
    });
  }

  const clearToDo = () => {
    setSubTodo({ subject: "", parent: row._id })
  }

  const save = () => {
    props.saveSub(subToDo);
  }


  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row.children && row.children.length > 0 && <IconButton aria-label="expand row" size="small" onClick={handleShowHide(row)}>
            {open || addSubTask ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>}

          <FormControlLabel style={{ marginLeft: 5 }}
            control={<Checkbox checked={row.status === true} onChange={handleChange(row)} name={row._id} />}
            label={row.subject}
          />

        </TableCell>
        <TableCell style={{ width: 25, paddingLeft: 0, paddingRight: 0 }} align="right">
          <IconButton onClick={handleAddSub(row)}>
            {addSubTask ? <CancelIcon /> : <AddBoxIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ width: 25, paddingLeft: 0, paddingRight: 0 }} align="right">
          <IconButton onClick={handleEdit(row)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell style={{ width: 25, paddingLeft: 0, paddingRight: 0 }} align="right">
          <IconButton onClick={handleDelete(row)}>
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      < TableRow >
        <TableCell style={{ paddingBottom: 20, paddingTop: 0 }} colSpan={6}>
          <Collapse in={addSubTask} timeout="auto" unmountOnExit>
            <Paper className={classes.rootAdd}>
              <InputBase
                className={classes.input}
                placeholder={"Add a sub task to " + row.subject}
                inputProps={{ 'aria-label': 'add a to do' }}
                onChange={handleTodoChange}
                value={subToDo.subject}
              // onChange={handleTodoChange}
              />
              <IconButton className={classes.iconButton} aria-label="search"
                onClick={save}
              >
                <CheckIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton color="secondary" className={classes.iconButton} aria-label="directions" onClick={clearToDo}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>

      {row.children && row.children.length > 0 && < TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open || addSubTask} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.children.map((childrow) => (
                    <TableRow key={childrow._id}>
                      <TableCell>
                        <FormControlLabel style={{ marginLeft: 5 }}
                          control={<Checkbox checked={childrow.status === true} onChange={handleChange(childrow)} name={childrow._id} />}
                          label={childrow.subject}
                        />
                      </TableCell>
                      <TableCell style={{ width: 30 }} align="right">
                        <IconButton onClick={handleEdit(childrow)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ width: 30 }} align="right">
                        <IconButton onClick={handleDelete(childrow)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>}
    </React.Fragment >
  );
}

export default Row;


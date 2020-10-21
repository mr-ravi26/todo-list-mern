import ToDo from './model';
import _ from 'lodash';
import mongoose from 'mongoose';

export default {

    AddToDo: (req, res, next) => {

        const { id, subject, parent } = req.body;
        const userid = req.user.id;
        const query = { 'user': req.user.id, '_id': id };

        if (!query._id) {
            query._id = new mongoose.mongo.ObjectID();
        }

        const data = {
            subject: subject,
            cr_by: userid,
            mod_by: userid,
            deleted: false,
            parent: parent,
            mod_date: Date.now(),
            cr_date: Date.now()
        }

        ToDo.findOneAndUpdate(query, data, { upsert: true, new: true }
            //     , function (err, doc) {

            //     if (err) return res.status(422).send(err);

            //     return res.send({
            //         success: true,
            //         todo: doc
            //     })
            // }
        )
            .populate("parent")
            .exec(function (err, existingUpload) {
                if (err) return res.status(422).send(err);

                res.json({
                    success: true,
                    todo: existingUpload
                })
            });
    },

    ToDoList: (req, res, next) => {

        ToDo
            .find({
                deleted: false,
                user: req.user.id
            }
                // , function (err, existingUpload) {
                //     if (err) return res.status(422).send(err);
                // }
            )
            .populate("parent")
            .exec(function (err, existingUpload) {
                if (err) return res.status(422).send(err);

                res.json({
                    success: true,
                    todos: existingUpload
                })
            });
    },

    SetStatus: (req, res, next) => {

        const { _id } = req.body;

        ToDo.findOne({
            _id: _id
        }, function (err, existingToDo) {
            if (err) return res.status(422).send(err);

            if (!existingToDo) return res.status(422).send(err);

            existingToDo.status = existingToDo.status ? false : true;
            existingToDo.mod_date = Date.now();
            existingToDo.save(
                //     function (err, updatedtodo) {

                //     if (err) return res.status(422).send(err);
                //     res.json({
                //         success: true,
                //         todo: updatedtodo
                //     })
                // }
            )
                .then(t => t.populate('parent')
                    .execPopulate()
                    .then(doc => {
                        res.json({
                            success: true,
                            todo: doc
                        })
                    }))
        })
    },

    DeleteToDo: (req, res, next) => {
        const { id } = req.params;

        const query = { '_id': id };

        const data = {
            deleted: true,
            mod_date: Date.now()
        }

        ToDo.findOneAndUpdate(query, data, { upsert: false, new: true }
            //     , function (err, doc) {
            //     if (err) return res.status(422).send(err);

            //     return res.send({
            //         success: true,
            //         todo: doc
            //     })
            // }
        )
            .populate("parent")
            .exec(function (err, existingUpload) {
                if (err) return res.status(422).send(err);

                res.json({
                    success: true,
                    todo: existingUpload
                })
            });
    }

}

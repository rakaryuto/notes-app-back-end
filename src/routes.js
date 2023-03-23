const {
  addNotesHandler, getAllNotesHandler, getNotesByIDHandler, editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'PUT',
    path: '/note/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesByIDHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;

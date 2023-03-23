/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */

const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      error: false,
      status: 'success',
      code: 500,
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    return response;
  }
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNotesByIDHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// const editNoteByHandler = (request, h) => {
//   const { id } = request.params;
//   const { title, tags, body } = request.payload;
//   const updateAt = new Date().toISOString();
//   const noteIndex = notes.findIndex((note) => note.id === id);

//   if (noteIndex !== -1) {
//     notes[noteIndex] = {
//       ...notes[noteIndex],
//       title,
//       tags,
//       body,
//       updateAt,
//     };

//     const response = h.response(
//       {
//         status: 'success',
//         message: 'Catatan sudah di-update',
//       },
//     );
//     response.code(200);
//     return response;
//   }

//   const response = h.response(
//     {
//       status: 'fail',
//       message: 'Gagal meng-update catatan',
//     },
//   );
//   response.code(404);
//   return response;
// };

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.cod(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNotesByIDHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};

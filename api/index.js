const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsData = require('./data');

const avatars = {};

const [comment, ...replies] = commentsData;

const comments = [
  {
    ...comment,
    replies,
  },
];

async function createComment(request) {
  const { content, username } = request.body;

  if (!content || !username) {
    return {
      errors: {
        content: !content ? 'Content is required' : undefined,
        username: !username ? 'Username is required' : undefined,
      },
    };
  }

  const id = Math.random().toString(36).substr(2, 9);

  let avatar;

  if (avatars[username]) {
    avatar = avatars[username];
  } else {
    const response = await fetch(
      'https://api.lorem.space/image/face?w=150&h=150'
    );
    avatar = response.url;
    avatars[username] = avatar;
  }

  const newComment = {
    id,
    content,
    createdAt: new Date().getTime(),
    score: Math.ceil(Math.random() * 100),
    user: {
      username,
      avatar,
    },
  };

  return newComment;
}

function findAndDeleteById(array, id) {
  for (const item of array) {
    if (item.id === id) {
      array.splice(array.indexOf(item), 1);

      return item;
    }

    if (item.replies && item.replies.length) {
      const innerResult = findAndDeleteById(item.replies, id);

      if (innerResult) return innerResult;
    }
  }
}

app.get('/comments', (request, response) => {
  response.json({
    comments,
  });
});

app.post('/comment', async (request, response) => {
  const newComment = await createComment(request);

  if (newComment.errors) {
    return response.status(400).json({ errors: newComment.errors });
  }

  comments.push(newComment);

  return response.status(201).json(newComment);
});

app.post('/comment/:id/reply', async (request, response) => {
  const { id } = request.params;

  const newComment = await createComment(request);

  if (newComment.errors) {
    return response.status(400).json({ errors: newComment.errors });
  }

  const comment = comments.find((comment) => comment.id === id);

  if (!comment) {
    return response
      .status(404)
      .json({ errors: { comment: 'Comment not found' } });
  }

  if (!comment.replies) {
    comment.replies = [];
  }

  comment.replies.push(newComment);

  return response.status(201).json(comment);
});

app.delete('/comment/:id', (request, response) => {
  const { id } = request.params;

  const comment = findAndDeleteById(comments, id);

  if (!comment) {
    return response
      .status(404)
      .json({ errors: { comment: 'Comment not found' } });
  }

  return response.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

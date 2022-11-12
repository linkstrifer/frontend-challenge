# Double Nines Code Challenge

This exercise aims to show us your code style and experience. We will be putting the focus on:

- how do you resolve the problem.
- how do you name the things.
- how do you define the functions.
- how you test.
- how you document.
- how do you use GIT and your commit styling.

In this repository you will find two folders, one is the REST API that you will use (you don’t have to touch it), and a React empty project with the basic stuff (from create-react-app).

You can install any library you need, take in mind that we will check all your code so it will be better to **show off your skills**, try to use the least amount of libraries, that way, we will have more code to review.

## Challenge

The challenge is a comment nested section, similar to Facebook comments:

| Desktop                                               | Mobile                                              |
| ----------------------------------------------------- | --------------------------------------------------- |
| ![Desktop Design](/project/design/desktop-design.jpg) | ![Mobile Design](/project/design/mobile-design.jpg) |

## Project Structure

This repository is divided in three folders:

- Project: Here you'll find all the designs, assets, states and a style guide with all the colors and fonts.
- API: This is the REST API that you will use to get the comments, you don't need to touch anything here, this is just for you to have the data.
- UI: This is the React project, you will find the basic stuff to start working on the challenge.

## API Endpoints

- `GET` `/comments`: This endpoint will return all the comments.
- `POST` `/comment`: This endpoint will create a new comment.
- `POST` `/comment/:id/reply`: This endpoint will create a new reply for a comment.
- `DELETE`: `/comment/:id`: This endpoint will delete a comment.

### Comment payload

```ts
type CommentPayload = {
  content: string;
  username: string;
};
```

We will generate the user avatar images for you, so don't worry about it.

### Responses

The `/comment` and `/comment/:id/reply` endpoints will return the new comment created, in the case of the `reply`, it will return the replied comment with all the replies.

Here is the full comment response type:

```ts
type Comment = {
  id: string;
  content: string;
  createdAt: number;
  score: number;
  user: {
    avatar: string;
    username: string;
  };
  replies?: Comment[];
};
```

\*The `createdAt` is a timestamp in milliseconds.

For the `GET` `/comments` endpoint, you will get an array of comments, the response type is the same as the `Comment` type.

`DELETE` `/comment/:id` will return a 204 status code.

## How to start

- Clone this repository.
- Install the dependencies for the API and the UI.
- Start the API using `npm run start` inside the `api` folder.
- Start the UI using `npm run start` inside the `ui` folder.
- If you add tests, you can run the tests using `npm run test` inside the `ui` folder.

import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      body
      createdAt
      userId
      read
    }
  }
`;

export const DELETE_POST = gql`
  mutation MarkPostAsRead($postId: Int!) {
    deletePost(id: $postId)
  } 
`

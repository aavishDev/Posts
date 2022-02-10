import axios from "axios";

export const getAllUsers = () => {
  return axios
    .post("http://localhost:5000/graphql", {
      query: `
          query getAllUsers {
              users {
                  id,
                  name,
                  username,
                  company {
                      name
                  }
              }
          }
        `,
    })
    .then((res) => res.data.data);
};

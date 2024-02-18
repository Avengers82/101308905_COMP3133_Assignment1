const { gql } = require('apollo-server-express');

const authResponseTypeDef = gql`
  type AuthResponse {
    success: Boolean!
    message: String
    token: String
  }
`;

module.exports = { authResponseTypeDef };

export default function callGraphQLApi({
  endpoint,
  query,
  variables,
  operationName,
  token
}) {
  return fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({
      query,
      variables,
      operationName
    }),
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(r => r.json());
}

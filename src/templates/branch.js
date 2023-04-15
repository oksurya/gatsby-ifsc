import React from 'react';
import { graphql } from 'gatsby';

export default function Branch({ data, pageContext }) {
  const { branchName } = pageContext;
  const { edges } = data.allBankCsv;

  // Filter the bank records by the selected branch name
  const branchRecords = edges.filter(({ node }) => node.BRANCH === branchName);

  // Extract an array of all the IFSC codes for the branch
  const ifscCodes = branchRecords.map(({ node }) => node.IFSC);

  return (
    <div>
      <h1>{branchName}</h1>
      <p>IFSC codes:</p>
      <ul>
        {ifscCodes.map((ifscCode) => (
          <li key={ifscCode}><a href={`/ifsc/${ifscCode}`}>{ifscCode}</a></li>
          
        ))}
      </ul>
    </div>
  );
}

export const query = graphql`
  query($branchName: String!) {
    allBankCsv(filter: { BRANCH: { eq: $branchName } }) {
      edges {
        node {
          IFSC
          BRANCH
        }
      }
    }
  }
`;

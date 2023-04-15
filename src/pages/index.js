import React from 'react';
import { graphql, Link } from 'gatsby';

export default function BranchList({ data }) {
  const branches = data.allBankCsv.group;

  return (
    <div>
      <h1>All Branches</h1>
      <ul>
        {branches.map(({ fieldValue, totalCount }) => (
          <li key={fieldValue}>
            <Link to={`/branch/${fieldValue}`}>{fieldValue} ({totalCount})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const query = graphql`
  {
    allBankCsv {
      group(field: BRANCH) {
        fieldValue
        totalCount
      }
    }
  }
`;

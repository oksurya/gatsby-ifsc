import React from 'react';
import { graphql } from 'gatsby';

export default function Ifsc({ data }) {
  const { BANK, IFSC, BRANCH, CITY, STATE, ADDRESS } = data.bankCsv;

  return (
    <div>
      <h1>{BANK}</h1>
      <p>
        <strong>IFSC:</strong> {IFSC}
      </p>
      <p>
        <strong>Branch:</strong> {BRANCH}
      </p>
      <p>
        <strong>City:</strong> {CITY}
      </p>
      <p>
        <strong>State:</strong> {STATE}
      </p>
      <p>
        <strong>Address:</strong> {ADDRESS}
      </p>
    </div>
  );
}

export const query = graphql`
  query($ifsc: String!) {
    bankCsv(IFSC: { eq: $ifsc }) {
      BANK
      IFSC
      BRANCH
      CITY
      STATE
      ADDRESS
    }
  }
`;

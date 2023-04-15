exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allBankCsv {
        nodes {
          IFSC
        }
      }
    }
  `);
  const branchResult = await graphql(`
  query {
    allBankCsv {
      group(field: BRANCH) {
        fieldValue
      }
    }
  }
`);

  if (result.errors) {
    throw result.errors;
  }
  if (branchResult.errors) {
    throw branchResult.errors;
  }
  const ifscNodes = result.data.allBankCsv.nodes;
  const branchNodes = branchResult.data.allBankCsv.group;

  // Create a new page for each IFSC code
  ifscNodes.forEach((node) => {
    createPage({
      path: `/ifsc/${node.IFSC}/`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        ifsc: node.IFSC,
      },
    });
  });

  branchNodes.forEach(({ fieldValue: branchName }) => {
    createPage({
      path: `/branch/${branchName}`,
      component: require.resolve('./src/templates/branch.js'),
      context: {
        branchName,
      },
    });
  });


};






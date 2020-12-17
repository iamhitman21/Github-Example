const sample = require('../samples/sample_issue');

const triggerIssue = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    url: `https://api.github.com/repos/${bundle.inputData.repo}/issues`,
    params: {
      filter: bundle.inputData.filter,
      state: bundle.inputData.state,
      sort: 'updated',
      direction: 'desc'
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'issue',
  noun: 'Issue',

  display: {
    label: 'Get Issue',
    description: 'Triggers when there is a new issue.'
  },

  operation: {
    inputFields: [
      {key: 'repo', label:'Repo', required: true, dynamic: 'repo.full_name.full_name'},
      {key:'filter', required: false, label: 'Filter', choices: {created:'created' ,all:'all'}, helpText:'Default is "all"', default: 'all'},
      {key:'state', required: true, label: 'State', choices: {open:'open',closed:'closed',all:'all'}, helpText:'Default is "open"', default: 'open'}
    ],
    perform: triggerIssue,

    sample: sample
  }
};

import fetch from 'node-fetch';
const core = require('@actions/core');

export const updateStatus = async (taskId) => {
  const query = new URLSearchParams({
    custom_task_ids: core.getInput('clickup_custom_id'),
    team_id: core.getInput('clickup_team_id')
  }).toString();

  const resp = await fetch(
    `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: core.getInput('clickup_token')
      },
      body: JSON.stringify({
        status: core.getInput('status')
      })
    }
  );

  const data = await resp.json();
  return data;
};

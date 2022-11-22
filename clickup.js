import fetch from 'node-fetch';
import { getInput } from '@actions/core';

export const updateStatus = async (taskId) => {
  const query = new URLSearchParams({
    custom_task_ids: getInput('clickup_custom_id'),
    team_id: getInput('clickup_team_id')
  }).toString();

  const resp = await fetch(
    `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getInput('clickup_token')
      },
      body: JSON.stringify({
        status: getInput('status')
      })
    }
  );

  const data = await resp.json();
  return data;
};

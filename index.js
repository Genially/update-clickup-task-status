import { setFailed, getInput } from '@actions/core';
import { context } from '@actions/github';
import { updateStatus } from './clickup';

async function run() {
  try {
    if (!context.payload.pull_request) {
      throw new Error(
        'The event that triggered the workflow is not related with a pull request'
      );
    }

    const prBody = context.payload.pull_request.body;
    const regex = /https:\/\/app\.clickup\.com\/t\/\S+/m;
    const urlFound = prBody.match(regex);
    if (!urlFound) {
      console.log('ClickUp task url not found in PR body');
      return true;
    }

    const taskId = urlFound[0].split('/').pop();
    const result = await updateStatus(taskId);
    if (result.status && result.status.status === getInput('status')) {
      console.log(`ClickUp task updated to status ${result.status.status}`);
    } else {
      throw new Error(
        `Can't update ClickUp task status to ${getInput('status')}`
      );
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();

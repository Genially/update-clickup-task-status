import { setFailed, getInput } from '@actions/core';
import { context } from '@actions/github';
import { updateStatus } from './clickup';

async function run() {
  try {
    if (!context.payload.pull_request) {
      throw new Error(
        'The event that triggered the workflow is not related to a pull request'
      );
    }

    const prBody = context.payload.pull_request.body;
    const regex = /https:\/\/app\.clickup\.com\/t\/\S+/m;
    const urlFound = prBody?.match(regex);
    if (!urlFound) {
      console.log('ClickUp task URL not found in PR body');
      return true;
    }

    const taskId = urlFound[0].split('/').pop();
    const result = await updateStatus(taskId);

    const expectedStatus = getInput('status');
    if (result?.status?.status === expectedStatus) {
      console.log(`ClickUp task updated to status ${result.status.status}`);
    } else {
      throw new Error(`Can't update ClickUp task status to ${expectedStatus}`);
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();

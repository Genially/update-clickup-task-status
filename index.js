import { core } from '@actions/core';
import { github } from '@actions/github';
import { updateStatus } from './clickup';

async function run() {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    if (!github.context.payload.pull_request) {
      throw new Error(
        'The event that triggered the workflow is not related with a pull request'
      );
    }

    const prBody = github.context.payload.pull_request.body;
    const regex = /https:\/\/app\.clickup\.com\/t\/\S+/m;
    const urlFound = prBody.match(regex);
    if (!urlFound) {
      throw new Error('ClickUp task url not found in PR body');
    }

    const taskId = urlFound[0].split('/').pop();
    const result = await updateStatus(taskId);
    console.log(`ClickUp response: ${JSON.stringify(result)}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
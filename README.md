# update-clickup-task-status

A Github Action to update ClickUp task status from Pull Requests

## Inputs

### `status`

**Required** The status to set the ClickUp task. Default `"review"`.

### `github_token`

**Required** Your Github Auth Token.

### `clickup_token`

**Required** Your ClickUp Auth Token.

### `clickup_custom_id`

If you use custom task ids in ClickUp set to true. Default `false`.

### `clickup_team_id`

If you use custom task ids in ClickUp, you should indicate the team id.

## Usage

This action will fail if you do not have the necessary permissions provided by the tokens or if the pull request doesn't contain in the body de ClickUp task url.

An example of its usage when pull request is opened:

```yaml
name: Update ClickUp Task Status
uses: genially/update-clickup-task-status@v1.0
on:
  pull_request:
    types:
      - opened
with:
  status: review
  github_token: ${{secrets.GITHUB_TOKEN}}
  clickup_token: ${{secrets.CLICKUP_TOKEN}}
  clickup_custom_id: true
  clickup_team_id: 123
```

Other example of its usage when pull request is merged:

```yaml
on:
  pull_request:
    types:
      - closed
jobs:
  if_merged:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Update ClickUp Task Status
        run: |
          echo The PR was merged
      - uses: genially/update-clickup-task-status@v1
        with:
          status: done
          github_token: ${{secrets.GITHUB_TOKEN}}
          clickup_token: ${{secrets.CLICKUP_TOKEN}}
          clickup_custom_id: true
          clickup_team_id: 123
```

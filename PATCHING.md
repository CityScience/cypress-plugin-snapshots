# Patching the plugin

## Git workflow

To patch an upstream release create a corresponding `releases/vX.Y.Z` branch in the CityScience
fork, apply any changes e.g. cherry-pick commits from earlier release branches and then tag this
branch. For example:

```bash
git clone git@github.com:CityScience/cypress-plugin-snapshots.git
cd cypress-plugin-snapshots
git remote add upstream git@github.com:meinaart/cypress-plugin-snapshots.git
git fetch --all --tags
git checkout -b releases/v1.2.9 v1.2.9
# Apply fixes/patches and commit to release branch, get it reviewed etc.
git tag v1.2.9-csc
git push origin --tags
```

The tag name should match the corresponding tag from upstream, with `-csc` appended to it.

## Testing

To test a modified release:

```bash
npm install
npm install --prefix cypress
npm run ci:test
```


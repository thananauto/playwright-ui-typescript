export default {
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(QA|PROD|PREPROD)\]\[([A-Za-z0-9_]+(\|[A-Za-z0-9_]+)*)\] - (.+)$/,
      headerCorrespondence: ['issue', 'title'],
    },
  },
  plugins: [
    {
      rules: {
        'title-pattern': ({ issue, title }) =>
          issue === null || title === null
            ? [
                false,
                "Commit message pattern should be in the form of [QA|PROD|PREPROD][TEST_CASE_TAGS] - message \n for example: [PREPROD][Smoke] - Fixed login cases \n For 'TEST_CASE_TAGS' refer path 'utils/testTags.ts\n For multiple test tags use with '|' symbol\n for example: [QA][Smoke|ActionTest|EnvironmentTest] - Fixed cases",
              ]
            : [true, ''],
      },
    },
  ],
  rules: {
    'title-pattern': [2, 'always'],
  },
}

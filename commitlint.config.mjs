export default {
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(QA|TEST|STAGE)\]\[([A-Za-z0-9_]+(\|[A-Za-z0-9_]+)*)\] - (.+)$/,
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
                "Commit message pattern should be in the form of [QA|TEST|STAGE][TEST_CASE_TAGS] - message \n for example: [STAGE][Smoke] - Fixed login cases \n For 'TEST_CASE_TAGS' refer the annotation name of testsl\n for example: [QA][Smoke|Home|Cart] - Fixed cases",
              ]
            : [true, ''],
      },
    },
  ],
  rules: {
    'title-pattern': [2, 'always'],
  },
}

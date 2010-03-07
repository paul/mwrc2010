if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['http'] = [
  [
    [
      /^>\s+/g,
      'sh_request',
      1
    ],
    [
      /^<\s+/g,
      'sh_response',
      1
    ],
    [
      /^\*\s+/g,
      'sh_important',
      1
    ]
  ],
  [
    [
      /$/g,
      null,
      -2
    ]
  ]
];

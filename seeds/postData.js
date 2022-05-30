const { Post } = require('../models');

const postData = [
  {
    title: 'Faster JavaScript Builds with Metro',
    content: `
How Airbnb migrated from Webpack to Metro and made the development feedback loop nearly instantaneous, the largest production build 50% faster, with marginal end-user runtime improvements.
    
In 2018, the frontend Airbnb infrastructure relied on Webpack for JavaScript bundling which had served us well up until then; however, with our codebase almost having quadrupled in the previous year, the frontend team was noticing a significant impact on the development experience. Not only was build performance slow, but the average page refresh time for a trivial one-line code change was anywhere between 30 seconds and 2 minutes depending on the project size. In order to mitigate this, the team decided to migrate to Metro.
    `,
    creator_id: 1
  },
  {
    title: 'Master Higher-Order Functions in JavaScript',
    content: `
Higher-order functions are functions that make use of functions as either their argument or their return value. They are an important feature that cannot be overlooked in functional programming, allowing for easy nesting of functions to archive a specific task.

Today, we will be looking into what higher-order functions are in JavaScript, their importance and their role in functional programming. JavaScript is suitably known for functional programming because it accepts higher-order functions, which have been used extensively in the language.
    
To easily understand this topic, we need to understand better what functions and functional programming are.
`,
    creator_id: 2
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

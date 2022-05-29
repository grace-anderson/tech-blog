# Project: Tech Blog

[![](https://img.shields.io/badge/License-MIT-brightgreen)](https://opensource.org/licenses/MIT)


## Table of Contents
  - [Project Description](#project-description)
  - [Technologies](#technologies)
  - [Use](#use)
  - [Installation](#installation)
  - [License](#license)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Test Instructions](#test-instructions)
  - [Questions](#questions)
  - [Screenshots](#screenshots)


## Project Description 
The **Tech Blog** is a CMS-style blog site, where developers can publish their own blog posts and comment on other developers’ posts. While developers spend plenty of time creating new applications and debugging existing codebases, most developers also spend some of their time reading and writing about technical concepts, recent advancements, and new technologies. Developers can use the Tech Blog to publish their own writing, while monitoring and commenting on other developers' posts.

The Tech Blog functions simiar to well-known CMS (content management systems), such as Wordpress. The Tech Blog app follows the MVC paradigm in its architectural structure, uses Handlebars.js as its templating language, Sequelize as its ORM, the express-session npm package for authentication, and bcrypt for securing user credentials.

Any developer can view and try out the Tech Blog on [Heroku](https://frozen-caverns-29448.herokuapp.com/)

The Tech Blog code is available on [GitHub](https://github.com/grace-anderson/tech-blog).

## Technologies
* [Bash](https://gitforwindows.org/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [Connect session sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [ESLint](https://eslint.org/)
* [Express](http://expressjs.com/)
* [Express-session](https://www.npmjs.com/package/express-session)
* [Handlebars](https://www.npmjs.com/package/express-handlebars)
* [Insomnia](https://insomnia.rest/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [JSON](https://www.json.org/json-en.html)
* [Mysql2](https://www.npmjs.com/package/mysql2)
* [node](https://nodejs.org/en/)
* [Prettier](https://prettier.io/)
* [Sequelize](https://sequelize.org/)
* [Visual Studio](https://visualstudio.microsoft.com/downloads/) 

## Use
Try out the app on [Heroku](https://frozen-caverns-29448.herokuapp.com/).   
A gif illustrating these steps can be found under [Screenshots](#screenshots)
1. Click log in (top right) to create a Tech Blog user account
2. Enter a name, email and password, then click Sign Up
3. You will now see your Dashboard. This is where you can add posts. All posts you create will be listed here.
4. To create a new blog post, enter a title and post content. Then click publish.
5. Go to Home. You will see your post at the bottom of the list of posts
6. You may edit the posts you create by clicking on Edit Post.
7. To make a comment click on any post. Enter your comment, then click Add a comment.
8. You can edit or delete the comments you create. 
9. To log out, click on Logout (top right)

## Installation
* You need a [GitHub](https://github.com/) account to access the code
* Install the Tech Blog by forking the [repository](https://github.com/grace-anderson/tech-blog) and then cloning the fork locally
* More information
  * [How to fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
  * [GitHub getting started](https://docs.github.com/) 

## License
License covering this application: [MIT](https://opensource.org/licenses/MIT)

## Contribution Guidelines
* Contributions are welcome.
* Support resolving a number of issues would be very much appreciated: [Tech Blog Issues](https://github.com/grace-anderson/tech-blog/issues)
* You may contribute to the **Tech Blog** project following the Contribution Guidelines below.
* The code is located in the [Tech Blog Code Repository](https://github.com/grace-anderson/tech-blog) 
* To contribute, open a new issue describing your proposed enhancement or fix.
  * Before contributing, browse through the [open issues](https://github.com/grace-anderson/tech-blog/issues) to see if your issue already exists or if there is an issue you might be able to solve. 
  * If you're a newbie dev, start contributing by looking for issues labelled "good first issue"
* It is good practice to set up your project repository as an "upstream" remote and synchronize with the project repository
  * Don't update the main branch. Rather create your own branch using a descriptive brief name
* You can create pull requests, but only admins can review and merge.
  * Be nice to your reviewer by adding adding a plain English explanation of your pull request and how your updates addresses the issue/s or enhancements it concerns
* Also see the [GitHub Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines)

## Test Instructions
Test using the following User Story and Acceptance Criteria to validate the functionality of the Tech Blog.

#### **User Story**
AS A developer who writes about tech  
> I WANT a CMS-style blog site  
> SO THAT I can publish articles, blog posts, and my thoughts and opinions  

#### **Acceptance Criteria**
GIVEN a CMS-style blog site  
1. WHEN I visit the site for the first time  
    THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in  
2. WHEN I click on the homepage option  
    THEN I am taken to the homepage  
3. WHEN I click on any other links in the navigation  
    THEN I am prompted to either sign up or sign in  
4. WHEN I choose to sign up  
    THEN I am prompted to create a username and password  
5. WHEN I click on the sign-up button  
    THEN my user credentials are saved and I am logged into the site  
6. WHEN I revisit the site at a later time and choose to sign in  
    THEN I am prompted to enter my username and password  
7. WHEN I am signed in to the site  
    THEN I see navigation links for the homepage, the dashboard, and the option to log out  
8. WHEN I click on the homepage option in the navigation  
    THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created  
9. WHEN I click on an existing blog post  
    THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment  
10. WHEN I enter a comment and click on the submit button while signed in  
    THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created  
11. WHEN I click on the dashboard option in the navigation  
    THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post  
12. WHEN I click on the button to add a new blog post  
    THEN I am prompted to enter both a title and contents for my blog post  
13. WHEN I click on the button to create a new blog post  
    THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post  
14. WHEN I click on one of my existing posts in the dashboard  
    THEN I am able to delete or update my post and taken back to an updated dashboard  
15. WHEN I click on the logout option in the navigation  
    THEN I am signed out of the site  
16. WHEN I am idle on the site for more than a set time  
    THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments  

## Questions 
If you have questions about the **Tech Blog**, feel free to [email](mailto:helen.g.anderson@me.com) the author, Helen Anderson.

See more of Helen's work on [GitHub](https://github.com/grace-anderson)
